// ====================
//      IMPORTS
// ====================

//import * as X from "Y";

// ====================
//  ACCESS HTML BY DOM
// ====================

const searchBtn = document.getElementById('searchBtn'); //the Button to click to make a search
const locSearch = document.getElementById('locSearch'); //the input box ppl type their search into
const hisCon = document.getElementById('historyContainer'); //append gen'd History Buttons here
const cityBox = document.getElementById('cityBox'); //displays the current weather of the city
const gibFCCs = document.getElementById('gibFCCs'); //append forecast weather cards to this container


// ====================
//   INITIALIZATIONS
// ====================

var locationName;

// ====================
//      FUNCTIONS
// ====================

//Gets called by clicking the button. 
//Gathers the input'd info, sanitizes it, then
//Begins am async next() chain access all location weather data
//Culminating in a button made that can store whatever data of that locaton
function btnGO() {

    //Sanitize search inputs
    locationName = String(locSearch.value);
    if (locationName == "") {
        return;
    } else if (locationName == undefined) {
        return console.log('Input was undefined');
    } else if (/\d/.test(locationName)) {
        return console.log('No Numbers Please');
    } else if (/(?!,)(?! )\W|_/.test(locationName)) {
        return console.log('No Odd Characters Please');
    } else {
        console.log('You searched for: ' + locationName);
    }

    geoAPI();
};


//First, we use openweather's Geocoding API to get the needed Lat and Long from the user input
function geoAPI() {

    var LONGLATurl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationName + '&limit=1&appid=3b3319e2a4bdc403d7f45843c07de674';
    
    const geoData = fetch(LONGLATurl)

    .then(function (response) {
      return response.json();
    })

    .then((data) => {
      return [data[0].lat, data[0].lon];
    });

    const giveLongLats = () => {
        geoData.then((a) => {
            mainAPI(a[0], a[1]);
            });
    };

    giveLongLats();
};

//Second, we then pass those Lat and Long into the main openweather API 
function mainAPI(Lat, Lon) {

    var TRUEurl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+Lat+'&lon='+Lon+'&exclude=minutely,hourly,daily,alerts&appid=3b3319e2a4bdc403d7f45843c07de674';

    fetch(TRUEurl)

      .then(function (response) {
          return response.json();
    })

      .then(function (data) {
          console.log(data);
          genHB(locationName, Lat, Lon);
    });
};
    
    
//Thirdly, we generate a history button with all that data appended to it
function genHB(locationName, Lat, Lon) {

    let freshBtn = document.createElement('button');
    freshBtn.type = 'button';
    freshBtn.classList.add('btn', 'btn-light', 'btn-block', 'btntizeMe');
    freshBtn.innerHTML = locationName;

    freshBtn.dataset.lat = Lat;
    freshBtn.dataset.lon = Lon;

    //freshBtn.addEventListener("click", MAKESOMETHINGNEW); //Just goes straight to fetchAPI and skips all the other stuff

    hisCon.appendChild(freshBtn);
};

//Adds event listener to search button
searchBtn.addEventListener("click", btnGO);

