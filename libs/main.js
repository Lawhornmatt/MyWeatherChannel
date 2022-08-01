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

// var currentLAT;
// var currentLON;

// var currentLAT = String(29.7589382);
// var currentLON = String(-95.3676974);

// currentLAT = currentLAT.substring(0, 5);
// console.log('LATitude is: ' + currentLAT);
// currentLON = currentLON.substring(0, 5);
// console.log('LONgitude is: ' + currentLON);

// ====================
//      FUNCTIONS
// ====================

//Gets called by clicking the button. 
//Gathers the input'd info, sanitizes it, then
//Bifurcates and passes info into //History and into //getAPI
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
    
    var LONGLATurl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationName + '&limit=1&appid=3b3319e2a4bdc403d7f45843c07de674';

    // generate a History Button
    // genHB(locationName);

    //fetch from the Weather API

    // const geoData = fetch(LONGLATurl)

    // .then(function (response) {
    //   return response.json();
    // })

    // .then((data) => {
    //   return [data[0].lat, data[0].lon];
    // });

    // const giveLongLats = () => {
    //     geoData.then((a) => {
    //         console.log(a);
    //         });
    // };

    // giveLongLats();

    geoAPI(LONGLATurl);



    // let locationLAT = locaGEO.then(value => value[0].lat);
    // let locationLON = locaGEO.then(value => value[0].lon);
    
    // mainAPI(locationLAT, locationLON);
    // var locationData = mainAPI(locationLAT, locationLON);
};

//Generates a History Button
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


//First, we use openweather's Geocoding API to get the needed Lat and Long from the user input
function geoAPI(url) {

    const geoData = fetch(url)

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

//We then pass the those Lat and Long into the main openweather API 
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

//Adds event listener to search button
searchBtn.addEventListener("click", btnGO);

