let map;
let geocoder;

function initMap() {
    // Initialize the map centered on a default location (Los Angeles for example)
    map = new google.maps.Map(document.getElementById("map-canvas"), {
        center: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        zoom: 12,
    });

    // Initialize the geocoder
    geocoder = new google.maps.Geocoder();
}

function findRoute() {
    let address = document.getElementById("destination").value;

    // If address is provided, geocode it
    if (address) {
        geocodeAddress(address);
    } else {
        alert("Please enter a destination!");
    }
}

