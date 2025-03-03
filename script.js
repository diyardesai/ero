// Initialize and add the map
// let = declaring variable
let map;
let geocoder;
let directionsService;
let directionsRenderer;

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var mapOptions = {
      zoom: 7,
      center: chicago
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
}
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
        travelMode: google.maps.TravelMode.DRIVING 
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        } else {
            alert("Could not calculate route: " + status);
        }
    });
}
