d3.csv('https://raw.githubusercontent.com/mixxr/rws/refs/heads/main/apps/quotes/scripts/_sectors/sunburst_calculated.csv', function(err, rows){
  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}
var pcts = unpack(rows, 'avgs');
var values = pcts.map(v => Math.abs(v));
var data = [
    {
      type: "sunburst",
      maxdepth: 4,
      ids: unpack(rows, 'ids'),
      labels: unpack(rows, 'labels'),
      parents:unpack(rows, 'parents'),
      values:values,
      leaf: { opacity: 0.4 },
      textinfo: "label",
      hoverinfo: "label+text",
      hovertext: pcts.map(v => v + "%"),
      marker: {
        line: { width: 2 },
        colors: pcts,     // signed → red/green
        cauto: true,
        colorscale: [
          [0, "red"],
          [1, "green"]
        ]
      }
    }
  ];

var layout = {
  margin: { l: 0, r: 0, b: 0, t: 0 }
};


Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
})
