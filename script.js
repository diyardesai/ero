// Initialize and add the map
// let = declaring variable
let map;
let geocoder;
let directionsService;
let directionsRenderer;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  //Chicago
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
      zoom: 7,
      center: chicago
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
}
/*
function findRoute() {
    let address = document.getElementById("destination").value;

    // If address is provided, geocode it
    if (address) {
        geocodeAddress(address);
    } else {
        alert("Please enter a destination!");
    }
}
function geocodeAddress(address) {
  geocoder.geocode({ address: address }, function (results, status) {
      if (status === "OK") {
          let destination = results[0].geometry.location;
          let start = { lat: 34.0522, lng: -118.2437 }; // user
          calculateRoute(start, destination);
      } else {
          alert("not successful for the following reason: " + status);
      }
  });
}*/
function calcRoute() {
  var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;

    if (!start || !end) {
        alert("Please enter both a start and destination address.");
        return;
    }

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING // Change to WALKING, BICYCLING, or TRANSIT if needed
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert("Could not calculate route: " + status);
        }
    });
}
