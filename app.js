const KEY = 'pk.11e107d65a5b0a939a0651380230610b';
const GRAPHHOPPER_KEY = 'aeb331c6-9c68-491c-b2d7-db22840065f3';
const VIEWBOX = '-79.8798, 40.5134, -80.0522, 40.4153';

const searchInput = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const goButton = document.getElementById('goButton');
let markerList = [];

var map = L.map('mapContainer', {zoomControl: false}).setView([40.4406, -79.9959], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 18,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
L.tileLayer('https://{s}-tiles.locationiq.com/v2/obk/r/{z}/{x}/{y}.png?key=pk.11e107d65a5b0a939a0651380230610b').addTo(map);
map.setMaxBounds(map.getBounds());
map.options.minZoom = 13;
map.options.maxZoom = 18;
L.tileLayer.provider('CartoDB.Voyager').addTo(map);
//L.tileLayer.provider('Stamen.TonerLite').addTo(map);

searchButton.addEventListener(type='click', getInfo);

function getInfo(event){
    const query = searchInput.value;
    fetch('https://us1.locationiq.com/v1/search?key='+KEY+'&q='+query+'&format=json&limit=8&viewbox='+VIEWBOX+'&bounded=1', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
.then(response => response.json())
.then(result => parseResult(result))
}



function parseResult(resultList){
    let listContainer = document.getElementById('resultList');
    listContainer.innerHTML="";
    for(const result of resultList){
        const li = document.createElement('li');
        const aLink = document.createElement('a')
        aLink.href = "#";
        const lat = result.lat;
        const lon = result.lon;
        aLink.innerText = result.display_name;
        li.dataset.lat = lat;
        li.dataset.lon = lon;
        listContainer.appendChild(li);
        li.appendChild(aLink);
    }
    let listItems = listContainer.getElementsByTagName('li');
    for(let i = 0; i < listItems.length; i++){
        listItems[i].addEventListener(type='click', () => goToLocation(listItems[i].dataset.lat, listItems[i].dataset.lon));
    }
}

function goToLocation(lat, lon){
    let position = new L.LatLng(lat, lon);
    let markerExists = false;
    for(marker of markerList){
        if(position.equals(marker.getLatLng()))
        markerExists = true;
    }
    if(!markerExists){
        var marker = L.marker([lat, lon]).addTo(map);
        markerList.push(marker);
        marker.addEventListener(type='dblclick', () => deleteMarker(marker));
    }
    map.flyTo([lat, lon], 16);
}

function deleteMarker(marker){
    markerList.splice(markerList.indexOf(marker));
    map.removeLayer(marker);
}

goButton.addEventListener(type='click', createRoute);

function createRoute(){
    let positionList = [];
    for(marker of markerList){
        positionList.push(marker.getLatLng());
    }
    L.Routing.control({
        waypoints: positionList,
        router: L.Routing.graphHopper(GRAPHHOPPER_KEY, { urlParameters:{vehicle: 'bike'}}),
        collapsible: true
    }).addTo(map);
}
