# leaflet-challenge
3rd Party Code Sources:
    Chat-GPT
    edX tutors

Leaflet Map Initialization:
    The map is centered at latitude 0 and longitude 0 with zoom level 2.
    OpenStreetMap tiles are added as the base layer.

Fetching Earthquake Data:
    The GeoJSON data is fetched using D3.js.

Marker Customization:
    Marker size is determined by the earthquake's magnitude.
    Marker color is determined by the earthquake's depth.
    Popup displays the location, magnitude, depth, and time of the earthquake.

Legend Creation:
    A legend is added to the bottom right of the map to explain the color coding for depths.