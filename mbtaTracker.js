
//global variables that will be used acrros the project
var locations = [];
var markers =[];
var map = null;
var lonlat = [];

mapboxgl.accessToken =mapboxgl.accessToken = 'pk.eyJ1IjoiaWVjYXJyaW9uIiwiYSI6ImNsbDRlbnc5ZzA0bDcza3BidnQ5N2J3OG0ifQ.KxDoA4h5wdwoGgS7MnbZlw';                               

//function used to fetch the realtime information of the buses from mbta.
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json = await response.json();
    return json.data;   
}


//function that executes every 15 seconds to load the real time data from mbta.
async function run(){
    locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);

    //add and move markers
    addMarkers();

    //timer
    setTimeout(run, 15000);

}

//this function adds the map to the div element.
const addMap = () => {
    map = new mapboxgl.Map ({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-71.103081, 42.365554],
        zoom: 12
    })
}


//this function adds the markers to the map and also refreses the location acording to the data fetched from the mbta.
// color: #b40219;          red
// color: #1d02b4           blue
// direction_id: 1
const addMarkers = () => {
       
    var thMarker = null;

    if (markers.length == 0) {
        locations.forEach((busRide, index) => {            
            lonlat = [];
            lonlat.push([busRide.attributes.longitude,busRide.attributes.latitude]);

            if (busRide.attributes.direction_id == 0) {            
                thMarker = new mapboxgl.Marker({"color": "#b40219"})
                .setLngLat(lonlat[0])
                .addTo(map);
            }
            else
            {
                thMarker = new mapboxgl.Marker({"color": "#1d02b4"})
                .setLngLat(lonlat[0])
                .addTo(map);
            }
            markers.push({id:busRide.id, marker:thMarker});
        })
    }
    else {
        markers.forEach((marker, index) => {            
            lonlat = []
            lonlat.push([locations[index].attributes.longitude,locations[index].attributes.latitude]);
            marker.marker.setLngLat(lonlat[0]);
        })    
    }
}

run();
