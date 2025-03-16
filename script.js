// Initialize and add the map
// declare the variables
var map, geocoder, directionsService, directionsRenderer;
var selectedMode = "DRIVING"; // default mode
// function to initialize the map and set up the directions service and renderer
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  
  var mapOptions = {
      zoom: 7, // initial zoom level
      center: {lat: 34.0522, lng: -118.2437} // default to los angeles
  };
// create map object and set it to the "map-canvas" div
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  // set the directions renderer to the map
  directionsRenderer.setMap(map);
}
// update travel mode when user clicks a button
function setTravelMode(mode) {
  selectedMode = mode; // update selected mode
  calcRoute(); // recalculate with new mode

}

// fucntion to calculate based on user input
function calcRoute() {

    var start = document.getElementById("start").value; // get start value from input
    var end = document.getElementById("end").value; // get end address from input
    var timeInput = document.getElementById("time").value; // get the time input
    var timeType = document.getElementById("timeType").value; //get whether it is arrival or departure
    // alert the user if any is missing
    if (!start || !end) {
        alert("Please enter both a start and destination address.");
        return;
    }
// create the request object for the directions service
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode[selectedMode],
        avoidHighways: false,  // Ensure highways are NOT avoided
        avoidTolls: false,// Ensure tolls are not avoided.
        transitOptions: {
            arrivalTime: new Date(/* now, or future date */)
        },
        drivingOptions: {
          departureTime: new Date(/* now, or future date */)//,
        }
      }
    var selectedTime;
    if (timeInput){
        selectedTime = new Date(timeInput); // convert itme input into date object
// if departure time is seleccted, this time is the request
        if(timeType === "departure"){
            request.drivingOptions.departureTime = selectedTime;
           
        } else if(timeType === "arrival"){ // if arrival time is selected, this time is the request
            request.transitOptions.arrivalTime = selectedTime;
          
        }
    }
  
// call the directions serice to calculate the route based on the request
    directionsService.route(request, function (result, status) {
     
        if (status === google.maps.DirectionsStatus.OK) { // if the route is calculated successfully
            directionsRenderer.setDirections(result); // display the route on map

            var leg = result.routes[0].legs[0]; // get first leg of the route
            var distance = leg.distance.value / 1000; // convert distance into km
            var travelTime = leg.duration.value; // Travel time in seconds
            var co2SavedPerMile = 411; // grams of CO2 saved per mile by biking
            var co2Saved = co2SavedPerMile * (distance / 1.60934);// calculate co2 saved for the distance

            // Calculate arrival time if departure time is provided
            var arrivalTimeStr = "N/A"; // default value
            if (timeInput && timeType === "departure") {
                var arrivalTime = new Date(selectedTime.getTime() + travelTime * 1000); // Add travel time to departure time
                arrivalTimeStr = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } // If arrival time is provided, just display it
            else if (timeInput && timeType === "arrival") {
                arrivalTimeStr = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            // display the route details (estimated time, distance, arrival time, c02 saved)
            document.getElementById("output").innerHTML = `
                <strong>Estimated Travel Time:</strong> ${leg.duration.text} <br>
                <strong>Distance:</strong> ${leg.distance.text} <br>
                <strong>Estimated Arrival Time:</strong> ${arrivalTimeStr} <br>
                 ${selectedMode === "BICYCLING" ? `<strong>CO2 Saved by Biking:</strong> ${co2Saved.toFixed(2)} grams <br>` : ""}
            
        `;
        } else { // if calculation fails
            alert("Could not calculate route: " + status);
        }
    });
}
