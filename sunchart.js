var labels = [
  "NASDAQ", 
  "Banks", "Semiconductors", "Software", "Retail",

  "Bank1", "Bank2",
  "SemiCo1", "SemiCo2", "SemiCo3",
  "SoftCo1", "SoftCo2",
  "RetailCo1", "RetailCo2"
];

var parents = [
  "", 
  "NASDAQ", "NASDAQ", "NASDAQ", "NASDAQ",

  "Banks", "Banks",
  "Semiconductors", "Semiconductors", "Semiconductors",
  "Software", "Software",
  "Retail", "Retail"
];

// Signed daily % change (for colors)
var pctChange = [
  0.5,      // NASDAQ
  -1.2, 2.4, 1.1, -0.8,   // sectors
  -2.1, -0.5,             // banks
  3.2, 1.8, -0.4,         // semiconductors
  0.9, 2.2,               // software
  -1.7, 0.3               // retail
];

// Values must be positive → use absolute % change
var values = pctChange.map(v => Math.abs(v));

var data = [
{
  type: "sunburst",
  labels: labels,
  parents: parents,
  values: values,

  leaf: { opacity: 0.4 },

  textinfo: "label",
  hoverinfo: "label+text",
  hovertext: pctChange.map(v => v + "%"),

  marker: {
    line: { width: 2 },
    colors: pctChange,     // signed → red/green
    cauto: true,
    colorscale: [
      [0, "red"],
      [1, "green"]
    ]
  }
}];

var layout = {
  margin: { l: 0, r: 0, b: 0, t: 0 }
};

Plotly.newPlot("myDiv", data, layout, { showSendToCloud: true });

myPlot = document.getElementById("myDiv");
