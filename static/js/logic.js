// Creating the variables for the URL's
var earthquakesURL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var tectonicURL =
  "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Creating the Layer variables for both datasets.
var earthquakes = new L.LayerGroup();
var tectonicPlates = new L.LayerGroup();

// Defining the Tile variables

// Satellite map
var satelliteMap = L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY,
  }
);

//Light map

var lightMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY,
  }
);

// Street map

mapbox: var streetMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY,
  }
);

// Defining a variable to hold the layers.

var baseMaps = {
  Satellite: satelliteMap,
  Light: lightMap,
  Street: streetMap,
};

// Defining a variable to hold the overlays
var overlayMaps = {
  Earthquakes: earthquakes,
  "Tectonic plates": tectonicPlates,
};

// Creating a variable and choosing default layers.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 2,
  layers: [satelliteMap, earthquakes],
});

// Creating the control that adds the layers to the map.

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Getting JSON data with D3
d3.json(earthquakesURL, function (earthquakeData) {
  // Creating a function to handle marker size.
  function markerSize(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }

  // Creating a function to colour the Markers.

  function chooseColor(magnitude) {
    switch (true) {
      case magnitude > 5:
        return "#581845";
      case magnitude > 4:
        return "#900C3F";
      case magnitude > 3:
        return "#C70039";
      case magnitude > 2:
        return "#FF5733";
      case magnitude > 1:
        return "#FFC300";
      default:
        return "#DAF7A6";
    }
  }







  // Creating a function to style the markers.

  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: chooseColor(feature.properties.mag),
      color: "#000000",
      radius: markerSize(feature.properties.mag),
      stroke: true,
      weight: 0.5,
    };
  }

