// Initialize and add the map
let map;
let geocoder;
async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  geocoder = new google.maps.Geocoder();
  // The map, centered at Uluru

  map = new Map (document.getElementById("map"), {
    zoom: 12,
    center: { lat: 34.0522, lng: -118.2437 }, // Los Angeles,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: { lat: 34.0522, lng: -118.2437 }, // Los Angeles,
    title: "Uluru",
  });
  function findRoute() {
    let address = document.getElementById("destination").value;

    // If address is provided, geocode it
    if (address) {
        geocodeAddress(address);
    } else {
        alert("Please enter a destination!");
    }
}
}

initMap();



// let map;
// Initialize and add the map
//const { Map } = await google.maps.importLibrary("maps");
//const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
//async function initMap() {
  //  default location 
    // const { Map } = await google.maps.importLibrary("maps");
    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
//     map = new google.maps.Map(document.getElementById("map-canvas"), {
//         center: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
//         zoom: 12,
//     });


//     // geocoder


//     const marker = new AdvancedMarkerElement({
//         map: map,
//         position: { lat: 34.0522, lng: -118.2437 },
//         title: "LA",
//       });
// }


// initMap();
