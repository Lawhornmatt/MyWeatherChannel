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


//BTN-GO
//Called by search btn, sani'd input, passes input to the API Chain
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

    //Removes any old forecasts before we start the chain
    infantAnnihilator(gibFCCs);

    //First of the API Chain: geoAPI -> currentAPI -> forecastAPI
    geoAPI();
};


//GEOCODING-API
//First, we use openweather's Geocoding API to get the needed Lat and Long from the user input
function geoAPI() {

    //Build the appropriate url from the sani'd locationName
    var LONGLATurl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + locationName + '&limit=1&appid=3b3319e2a4bdc403d7f45843c07de674';
    
    const geoData = fetch(LONGLATurl)

    .then(function (response) {
        return response.json();
    })

    //We now have the LATITUDE and LOGITUDE of our city
    .then((data) => {
        console.log(data); //See the data from the Geocoding API
        return [data[0].lat, data[0].lon];
    });

    //Takes those Coords and passes them into the two APIs for display on the site
    const giveLongLats = () => {
        geoData.then((a) => {
            //   Makes history button 
            genHB(locationName, a[0], a[1]);
            // Call a function to update cityBox and make a history button 
            currentAPI(a[0], a[1]);
            // Call a function to fetch a forecast and update the forecast box 
            forecastAPI(a[0], a[1]);
            });
    };

    //Probably don't need this and just have the function automatically get called above...
    giveLongLats();
};

//CURRENT-API
//Second, we then pass those Lat and Long into the OneCall openweather API andtrim it down to only give current weather
function currentAPI(Lat, Lon) {

    var currentURL = 'https://api.openweathermap.org/data/2.5/onecall?lat='+Lat+'&lon='+Lon+'&exclude=minutely,hourly,daily,alerts&appid=3b3319e2a4bdc403d7f45843c07de674';

    fetch(currentURL)

        .then(function (response) {
            return response.json();
    })

        .then(function (data) {
            console.log(data); //Use to see the current weather displayed in console

            //   Updates cityBox 
            // But first lets turn this ridiculous Kelvin temp to FerenAmericaDegrees
            var fTemp = (((data.current.temp - 273.15) * 9/5) + 32).toFixed(1);
            genCB(locationName, data.current.weather[0].icon, fTemp, data.current.humidity, data.current.uvi);

    });
};
    
//GENERATE_HISTORY_BUTTON
//Thirdly, we generate a history button with all that data appended to it
function genHB(locationName, Lat, Lon) {

    let freshBtn = document.createElement('button');
    freshBtn.type = 'button';
    freshBtn.classList.add('btn', 'btn-light', 'btn-block', 'btntizeMe');
    freshBtn.innerHTML = locationName;

    freshBtn.dataset.lat = Lat;
    freshBtn.dataset.lon = Lon;

    freshBtn.addEventListener("click", redoAPI); //Just goes redoAPI() which will refresh page without making new button

    hisCon.appendChild(freshBtn);
};


//GENERATE_CITY_BOX
//Here, we generate and display all the current weather data in the cutyBox element
function genCB(place, icon, temp, humidity, uvi) {

    cityBox.childNodes[1].innerHTML = ('<h1 class="m-0">'+place+'</h1>' + ' <i class="icon'+icon+'"></i>' + '<h1 class="m-0">'+moment().format('MMMM Do YYYY')+'</h1>');

    cityBox.childNodes[3].innerHTML = ('<p>Temp: '+ temp +'</p>');

    cityBox.childNodes[5].innerHTML = ('<p>Humidity: '+ humidity +'</p>');

    cityBox.childNodes[7].innerHTML = ('<p>UV index: '+ uvi +'</p>');
};

//FORECAST-API
//Lastly, we then pass those Lat and Long into the forecast openweather API
function forecastAPI(Lat, Lon) {

    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat='+Lat+'&lon='+Lon+'&appid=3b3319e2a4bdc403d7f45843c07de674';

    fetch(forecastURL)

        .then(function (response) {
            return response.json();
    })

        .then(function (data) {
            console.log(data);
            for (let i=0;i<5;i++) {
                var farenFore = (((data.list[i].main.temp - 273.15) * 9/5) + 32).toFixed(1);
                genFC(i, data.list[i].weather[0].icon, farenFore, data.list[i].wind.speed, data.list[i].main.humidity);
            };

    });
};

//GENERATE_FORECAST_CARDS
//Creates all the elements, attaches the data, and appends them in the HTML
function genFC(index, icon, temp, wind, humid) {
    // Generate the elements 
    let freshCard = document.createElement('div');
    freshCard.classList.add('card', 'bg-secondary', 'col-2', 'p-0', 'mx-3', 'mb-3');

    let freshCHeader = document.createElement('div');
    freshCHeader.classList.add('card-header', 'm-0');

    let dateText = document.createElement('p');
    dateText.classList.add('text-center', 'm-0');
    dateText.innerHTML = moment().add((index+1), 'days').format('MMMM Do YYYY');

    let freshCBody = document.createElement('div');
    freshCBody.classList.add('card-body');

    let freshIcon = document.createElement('i');
    freshIcon.classList.add('icon'+icon);

    let tempText = document.createElement('p');
    tempText.classList.add('m-0');
    tempText.innerHTML = ('<p>Temp: ' + temp + '</p>');

    let windText = document.createElement('p');
    windText.classList.add('m-0');
    windText.innerHTML = ('<p>Wind: ' + wind + ' MPH</p>');

    let humidText = document.createElement('p');
    humidText.classList.add('m-0');
    humidText.innerHTML = ('<p>Humidity: ' + humid + '</p>');

    // Append Everything...
    // ...first to the header
    freshCHeader.appendChild(dateText);
    // ...then to the body
    freshCBody.appendChild(freshIcon);
    freshCBody.appendChild(tempText)
    freshCBody.appendChild(windText)
    freshCBody.appendChild(humidText)
    // ...then both those to the card
    freshCard.appendChild(freshCHeader);
    freshCard.appendChild(freshCBody);
    // ...and then the card to it's container 
    gibFCCs.appendChild(freshCard);
};

//REDO-API
//Re-inputs the Lat and Lon of a history button into the APIs all over again
function redoAPI() {

    //Removes any old forecasts before we start the chain
    infantAnnihilator(gibFCCs);    

    locationName = this.innerHTML;
    var Lat = this.dataset.lat 
    var Lon = this.dataset.lon
    
    console.log('==========')
    console.log('Re-searching for: '+locationName);
    console.log('Lat: '+Lat+' Long: '+Lon);

    //First redo currentAPI
    currentAPI(Lat, Lon);
    //Second redo forecastAPI
    forecastAPI(Lat, Lon);
};

//EVENT_LISTENERS
//Adds event listener to search button
searchBtn.addEventListener("click", btnGO);

//REMOVE LATER BY COMMENTS -- DEBUG
//I used these to debug the history buttons without depleting my 60 openweather requests per hour
// let debugBtn = document.getElementById('DEBUG');
// debugBtn.addEventListener("click", redoAPI);

//INFANT ANNIHILATOR
//Removes all children from a node, src'd from here: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
function infantAnnihilator(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}