let map;
let panorama;
const resetMapButton = document.querySelector('#reset-map');
const backToMapButton = document.querySelector('#back-to-map');
const panoramaElement = document.querySelector('#panorama');

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 48.858227, lng: 2.294559},
        zoom: 3,
        streetViewControl: false
    });
    panorama = new google.maps.StreetViewPanorama(document.getElementById('panorama'), {
        position: {lat: 48.858227, lng: 2.294559},
        pov: {
          heading: 34,
          pitch: 10
        }
    });
    addMapListeners();
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";  
}

function addMapListeners(){
    resetMapButton.addEventListener("click", resetMap);
    backToMapButton.addEventListener("click", backToMap);
}

function addMarkerOnMap(dream){
    const marker = new google.maps.Marker({
        position:  dream.coordinates,
        map: map,
        icon: dream.done ? "images/marker_done.png" : "images/marker.png"
    });  
     marker.addListener('click', function() {
        zoomOn(marker.getPosition());
    });
}

function zoomOn(position){
    map.setCenter(position);
    map.setMapTypeId('satellite');
    map.setZoom(20);  
}

function resetMap(){
    map.setCenter( {lat: 48.858227, lng: 2.294559});
    map.setMapTypeId('roadmap');
    map.setZoom(3);  
}

function backToMap(){
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";
    resetMapButton.style.display = "block";  
}

function visitDreamOnMap(position){
    panorama.setPosition(position);
    panoramaElement.style.display = "block";
    backToMapButton.style.display = "block";
    resetMapButton.style.display = "none";
}


export {initMap,addMarkerOnMap,visitDreamOnMap};