// Initialize and add the map
// let = declaring variable
let map;
let geocoder;
let directionsService;
let directionsRenderer;
var selectedMode = "DRIVING";

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
function setTravelMode(mode) {
  selectedMode = mode;
  calcRoute(); 
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
        travelMode: google.maps.TravelMode[selectedMode]
    };

    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            var leg = result.routes[0].legs[0]; 
            document.getElementById("output").innerHTML = `
                <strong>Estimated Travel Time:</strong> ${leg.duration.text} <br>
                <strong>Distance:</strong> ${leg.distance.text}
            `;
        } else {
            alert("Could not calculate route: " + status);
        }
    });
}
