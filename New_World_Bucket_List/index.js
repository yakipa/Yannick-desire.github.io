
// import {initMap} from './map';
// import {buildAllDreams} from './dream';

const data = [
    {
        id: 1,
        imagePath: "images/img_maldives.jpg",
        description: "Maison sur pilotis aux Maldives",
        done: false,
        link: "https://www.dreamingofmaldives.com/blog-des-maldives/les-plus-belles-villas-sur-pilotis-que-nous-ayons-vu-aux-maldives-notre-selection-en-photos/",
        coordinates: {
            lat:-0.681786, 
            lng:73.191414
        }
    },
    {
        id: 2,
        imagePath: "images/img_kenya.jpg",
        description: "Faire un Safari au Kenya",
        done: false,
        link: "http://www.kenya-guide.com/choix-safari-kenya",
        coordinates: {
            lat:-0.52483, 
            lng:36.664008
        }
        
    },
    {
        id: 3,
        imagePath: "images/img_paris.jpg",
        description: "Monter sur la Tour Eiffel",
        done: true,
        link: "http://www.toureiffel.paris/",
        coordinates: {
            lat: 48.858227, 
            lng: 2.294559
        }
    },
];

const dreamsContainer = document.querySelector('#dreams-container');

function buildAllDreams(){
    while (dreamsContainer.hasChildNodes()) {
        dreamsContainer.removeChild(dreamsContainer.lastChild);
    }
    data.forEach(buildOneDream);
    addDreamsListeners();
}

function buildOneDream(dream){
    const dreamElement = document.createElement('div');
    dreamElement.innerHTML = 
    `<div class="card text-center" id="${dream.id}">
      <h4 class="card-header font-weight-bold">${dream.description}</h4>
      <img class="card-img-top" src="${dream.imagePath}" alt="">
      <div class="card-body">
          <a href="#" class="button-action btn btn-${dream.done?"secondary":"danger"} btn-block font-weight-bold">${dream.done?"Je veux le refaire":"Je me lance !"}</a>
      </div>
      <div class="card-footer text-right">
          <a href="#" class="button-visit btn btn-outline-secondary btn-sm">Visiter</a>
          <a href="${dream.link}" target="_blank" class="button-info btn btn-outline-dark btn-sm">Plus d'infos</a>
      </div>
    </div>`;
    dreamsContainer.appendChild(dreamElement);
    addMarkerOnMap(dream);
}

function addDreamsListeners(){
  document.querySelectorAll(".button-visit").forEach(item => {
    item.addEventListener("click", event => {
      visitDream(item.parentElement.parentElement.getAttribute('id'));
    });
  });
  document.querySelectorAll(".button-action").forEach(item =>{
      item.addEventListener("click", event =>{
        toggleDreamDone(item.parentElement.parentElement.getAttribute('id'));
        buildAllDreams();
      });
  });
}

function visitDream(dreamId){
  let position = data.filter(item => item.id == dreamId)[0].coordinates;
  visitDreamOnMap(position);
}


function toggleDreamDone(dreamId){
  let dream = data.filter(item => item.id == dreamId)[0];
  dream.done = !dream.done;  
}


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



function init() {
    initMap();
    buildAllDreams();
}
window.init = init;
