d3.csv('https://raw.githubusercontent.com/mixxr/rws/refs/heads/main/apps/quotes/scripts/work/sectors.csv', function(err, rows){
  function unpack(rows, key) {
    return rows.map(function(row) { return row[key]; });
  }

var data = [
    {
      type: "sunburst",
      maxdepth: 4,
      ids: unpack(rows, 'id'),
      labels: unpack(rows, 'labels'),
      parents:unpack(rows, 'parents')
    }
  ];

var layout = {
  margin: {l: 0, r: 0, b: 0, t:0},
  sunburstcolorway:[
    "#636efa","#EF553B","#576662ff","#ab63fa","#19d3f3",
    "#e763fa", "#FECB52","#FFA15A","#FF6692","#B6E880"
  ],
  extendsunburstcolorway: true
};


Plotly.newPlot('myDiv', data, layout, {showSendToCloud: true});
})
