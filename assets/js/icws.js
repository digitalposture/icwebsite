/**
 * icws.js — shared utilities for the iCertificates Jekyll site.
 *
 * Safe for multiple script tag includes on the same page.
 */

if (!window._ICWS_LOADED_) {
    window._ICWS_LOADED_ = true;

    // ============================================================
    // § 1 · ErrorBox — UI notification + ISIN validation
    // ============================================================
    window.ErrorBox = (function () {
        const timers = {};

        function clear(boxId = 'errorBox') {
            const box = document.getElementById(boxId);
            if (!box) return;
            if (timers[boxId]) {
                clearTimeout(timers[boxId]);
                delete timers[boxId];
            }
            box.textContent = '';
            box.classList.add('hidden');
        }

        function show(message, boxId = 'errorBox', autoClearMs = 3000) {
            clear(boxId);
            const box = document.getElementById(boxId);
            if (!box) return;
            box.textContent = message;
            box.classList.remove('hidden');
            if (autoClearMs > 0) {
                timers[boxId] = setTimeout(() => clear(boxId), autoClearMs);
            }
        }

        function isValidISINFormat(isin) {
            return /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/.test(String(isin).trim().toUpperCase());
        }

        function splitIsins(csvString) {
            const valid = [];
            const invalid = [];
            String(csvString)
                .split(',')
                .map(x => x.trim().toUpperCase())
                .filter(Boolean)
                .forEach(isin => (isValidISINFormat(isin) ? valid : invalid).push(isin));
            return { validIsins: valid.join(','), invalidIsins: invalid.join(',') };
        }

        function validateIsinList(isinList, boxId = 'errorBox', autoClearMs = 10000) {
            const { validIsins, invalidIsins } = splitIsins(isinList);
            if (invalidIsins) {
                show(`The following ISIN(s) seems to be invalid: ${invalidIsins}`, boxId, autoClearMs);
            }
            return validIsins;
        }

        return { show, clear, isValidISINFormat, splitIsins, validateIsinList };
    })();


    // ============================================================
    // § 2 · Select Helpers
    // ============================================================
    window.createSelectUpdater = function ({ wsUrl, wsSecret, delimiter = ';' }) {
        return function updateSelectOptions(selectId, selectPath, valPos, textPos) {
            fetch(wsUrl + selectPath, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + wsSecret
                }
            })
                .then(r => r.json())
                .then(data => {
                    data.shift(); // remove header row

                    const uniqueSorted = data.sort((a, b) =>
                        (a.split(delimiter)[textPos] || '').toLowerCase()
                            .localeCompare((b.split(delimiter)[textPos] || '').toLowerCase())
                    );

                    const select = document.getElementById(selectId);
                    if (!select) return;

                    uniqueSorted.reduce((seen, row) => {
                        const cols = row.split(delimiter);
                        const value = cols[valPos];
                        const text = cols[textPos];
                        if (!seen[value]) {
                            seen[value] = true;
                            const opt = document.createElement('option');
                            opt.value = value;
                            opt.textContent = `${text} (${value})`;
                            select.appendChild(opt);
                        }
                        return seen;
                    }, {});
                })
                .catch(err => console.error('createSelectUpdater: fetch error for', selectId, err));
        };
    };


    // ============================================================
    // § 3 · DataTable Helpers
    // ============================================================
    window.extractData = function (dataRaw, tablePos, tableRespCols, delimiter = ';') {
        if (!dataRaw || dataRaw.length === 0) return [];
        const header = dataRaw[0].split(delimiter);
        const colIndex = {};
        header.forEach((col, idx) => { colIndex[col] = idx; });

        const projection =
            tableRespCols != null &&
                tableRespCols[tablePos] &&
                tableRespCols[tablePos].length > 0
                ? tableRespCols[tablePos]
                : null;

        return dataRaw.slice(1).map(row => {
            const cols = row.split(delimiter);
            return projection
                ? projection.map(colName => (colIndex[colName] !== undefined ? cols[colIndex[colName]] : ''))
                : cols;
        });
    };


    // ============================================================
    // § 4 · Plotly Helpers
    // ============================================================

    const LBL_MAX_LEN = 100;

    const _icwsNormalize = str =>
        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll(',', '-').trim();

    const _icwsCutIf = (str, maxLen) =>
        str.length > maxLen ? str.slice(0, maxLen) + '...\n' : str;

    window.createPlotlyData = function (rows, sourcePos, targetPos, sourceLblPos, targetLblPos, delimiter = ';') {
        const sources = [];
        const targets = [];
        const relations = [];

        rows.forEach(row => {
            const cols = row.split(delimiter);
            const source = cols[sourcePos || 0];
            const target = cols[targetPos || 3];

            const sourceLbl = (sourcePos === sourceLblPos)
                ? _icwsCutIf(cols[sourceLblPos || sourcePos || 0], LBL_MAX_LEN)
                : _icwsCutIf(cols[sourceLblPos || sourcePos || 0], LBL_MAX_LEN) + ' (' + source + ')';

            const targetLbl = (targetPos === targetLblPos)
                ? _icwsCutIf(cols[targetLblPos || targetPos || 3], LBL_MAX_LEN)
                : _icwsCutIf(cols[targetLblPos || targetPos || 3], LBL_MAX_LEN) + ' (' + target + ')';

            if (!targets.includes(target)) targets.push(targetLbl);
            if (!sources.includes(source)) sources.push(sourceLbl);
            relations.push([sourceLbl, targetLbl]);
        });

        const labels = [...sources, ...targets];
        const colors = [...sources.map(() => 'blue'), ...targets.map(() => 'green')];

        const positions = {};
        labels.forEach((lbl, i) => { positions[lbl] = i; });

        const srcArr = [], tgtArr = [], valArr = [];
        relations.forEach(([s, t]) => {
            srcArr.push(positions[s]);
            tgtArr.push(positions[t]);
            valArr.push(1);
        });

        return {
            node: { label: labels, color: colors },
            link: { source: srcArr, target: tgtArr, value: valArr }
        };
    };

    window.drawPlotly = function (data, isSwapped) {
        if (!data || !data.node || !data.link) {
            console.error('drawPlotly: invalid data', data);
            return;
        }

        const sources = isSwapped ? data.link.target : data.link.source;
        const targets = isSwapped ? data.link.source : data.link.target;

        const plotData = [{
            type: 'sankey',
            domain: { x: [0, 1], y: [0, 1] },
            orientation: 'h',
            node: {
                pad: 15,
                thickness: 30,
                line: { color: 'black', width: 0.5 },
                label: data.node.label,
                color: data.node.color
            },
            link: { source: sources, target: targets, value: data.link.value }
        }];

        const layout = { title: 'Sankey Diagram', font: { size: 10 } };
        Plotly.react('plotlyid', plotData, layout, { displayModeBar: false });
        Plotly.Plots.resize('plotlyid');
    };

    window.drawRadarPlotly = function (radarId, rawData) {
        const dimensions = ['Usability', 'Exhaustiveness', 'Clarity', 'Accuracy', 'Discoverability', 'Usability'];

        const data = rawData.map(d => ({
            type: 'scatterpolar',
            r: d.r,
            theta: dimensions,
            fill: 'toself',
            name: d.name
        }));

        const layout = {
            polar: { radialaxis: { visible: true, range: [0, 5] } }
        };

        Plotly.newPlot(radarId, data, layout, { displayModeBar: false });
    };

    window.extractColumn = function (data, columnName, delimiter = ';') {
        if (!Array.isArray(data) || data.length === 0) return [];
        const header = data[0].split(delimiter);
        const index = header.indexOf(columnName);
        if (index === -1) return [];
        return data.slice(1).map(row => (row.split(delimiter)[index] || ''));
    };

    //let originalPcts = null;
    //let originalRows = null;
    window.prepareSunburstData = function (rows, delimiter = ';') {
        const pcts = extractColumn(rows, 'avgs', delimiter);
        //originalPcts = pcts;
        //originalRows = rows;
        const values = pcts.map(v => Math.abs(v));

        return [{
            type: 'sunburst',
            maxdepth: 4,
            ids: extractColumn(rows, 'ids', delimiter),
            labels: extractColumn(rows, 'labels', delimiter),
            parents: extractColumn(rows, 'parents', delimiter),
            values,
            leaf: { opacity: 0.4 },
            textinfo: 'label',
            hoverinfo: 'label+text',
            hovertext: pcts.map(v => v + '%'),
            marker: {
                line: { width: 2 },
                colors: pcts,   // signed value → red/green scale
                cauto: true,
                colorscale: [[0, 'red'], [1, 'green']]
            }
        }];
    };

    window.drawSunburst = function (data, options = {}) {
        const layout = { margin: { l: 0, r: 0, b: 0, t: 0 } };
        const config = Object.assign({ displayModeBar: false }, options);
        Plotly.newPlot('plotlyid', data, layout, config);
    };

    window.highlightSunburstIds = function (gd, targetIds, {
        highlightColor = '#6afc09',
        dimColor = 'rgba(200,200,200,0.35)',
        originalColors = null
    } = {}) {
        const trace = gd.data[0];
        const ids = trace.ids;

        if (!targetIds || targetIds.length === 0) {
            if (originalColors) {
                Plotly.restyle(gd, { 'marker.colors': [originalColors] }, [0]);
            }
            return;
        }

        const targetSet = new Set(targetIds);
        const newColors = ids.map(id => targetSet.has(id) ? highlightColor : dimColor);

        Plotly.restyle(gd, { 'marker.colors': [newColors] }, [0]);
    }

    window.resetSunburstColors = function (gd, originalPcts) {
        if (originalPcts) Plotly.restyle(gd, { 'marker.colors': [originalPcts] }, [0]);
    }

    /**
 * Cerca gli id il cui label contiene (case-insensitive) una stringa parziale.
 *
 * @param {string[]} rows - array di righe CSV-like, prima riga = header (es. "ids;labels;parents;values;counts;avgs")
 * @param {string} partialIdToMatch - sottostringa da cercare dentro la colonna "labels"
 * @returns {string[]} - array degli "ids" corrispondenti
 */
    window.findIdsByLabel = function (rows, partialIdToMatch) {
        if (!rows || rows.length < 2 || !partialIdToMatch) return [];

        const delimiter = ';';
        const header = rows[0].split(delimiter);

        const idsCol = header.indexOf('ids');
        const labelsCol = header.indexOf('labels');

        if (idsCol === -1 || labelsCol === -1) {
            console.error('Colonne "ids" o "labels" non trovate nell\'header:', header);
            return [];
        }

        const needle = partialIdToMatch.toLowerCase();

        const matches = [];
        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(delimiter);
            const label = cols[labelsCol];

            if (label && label.toLowerCase().includes(needle)) {
                matches.push(cols[idsCol]);
            }
        }

        return matches;
    }
}
