//create map
let map = L.map('map').setView([0, 0], 2);

// create background tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to get color based on earthquake depth
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson').then(data => {
    // Function to get color based on depth
    function getColor(depth) {
        return depth > 500 ? '#800026' :
               depth > 300 ? '#BD0026' :
               depth > 200 ? '#E31A1C' :
               depth > 100 ? '#FC4E2A' :
               depth > 50  ? '#FD8D3C' :
               depth > 20  ? '#FEB24C' :
                             '#FFEDA0';
    }
    // Function to get radius based on magnitude
    function getRadius(magnitude) {
        return magnitude * 3;
    }

    // Add GeoJSON layer to the map
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h3>${feature.properties.place}</h3>
                             <p>Magnitude: ${feature.properties.mag}</p>
                             <p>Depth: ${feature.geometry.coordinates[2]} km</p>
                             <p>Time: ${new Date(feature.properties.time)}</p>`);
        }
    }).addTo(map);

    // Add a legend to the map
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'legend');
        const depths = [0, 20, 50, 100, 200, 300, 500];
        const labels = [];

        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
});