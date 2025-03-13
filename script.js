// Initialize and add the map
// let = declaring variable
var map, geocoder, directionsService, directionsRenderer;
var selectedMode = "DRIVING";

function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  
  var mapOptions = {
      zoom: 7,
      center: {lat: 34.0522, lng: -118.2437} // default to los angeles
  };

  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  directionsRenderer.setMap(map);
}
// update travel mode when user clicks a button
function setTravelMode(mode) {
  selectedMode = mode;
  calcRoute(); 

}


function calcRoute() {

    var start = document.getElementById("start").value;
    var end = document.getElementById("end").value;
    var timeInput = document.getElementById("time").value;
    var timeType = document.getElementById("timeType").value;

    if (!start || !end) {
        alert("Please enter both a start and destination address.");
        return;
    }

    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[selectedMode]
    };
    var selectedTime;
    if (timeInput){
        selectedTime = new Date(timeInput);
        //alert("Selected Departure Time: ", new Date(timeInput));

        if(timeType === "departure"){
            request.departureTime = selectedTime;
            alert(request.departureTime)
        } else if(timeType === "arrival"){
            request.arrivalTime = selectedTime;
            alert(request.arrivalTime)
        }
    }
    alert(request.departureTime); 
    alert("calcRoute function is being triggered"); 

    directionsService.route(request.departureTime, function (result, status) {
        alert("inside route function"); 
        console.log("Google Maps API Response: ", result);
        console.log("API Status: ", status);
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);

            var leg = result.routes[0].legs[0]; // get first leg of the route

            var travelTime = leg.duration.value; // Travel time in seconds

            // Calculate arrival time if departure time is provided
            var arrivalTimeStr = "N/A";
            if (timeInput && timeType === "departure") {
                var arrivalTime = new Date(selectedTime.getTime() + travelTime * 1000); // Add travel time to departure time
                arrivalTimeStr = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                alert(arrivalTimeStr);
            } // If arrival time is provided, just display it
            else if (timeInput && timeType === "arrival") {
                arrivalTimeStr = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }

            document.getElementById("output").innerHTML = `
                <strong>Estimated Travel Time:</strong> ${leg.duration.text} <br>
                <strong>Distance:</strong> ${leg.distance.text} <br>
                <strong>Estimated Arrival Time:</strong> ${arrivalTimeStr} <br>
        `;
        } else {
            alert("Could not calculate route: " + status);
        }
    });
}
