// ====================
//      IMPORTS
// ====================

//import * as X from "Y";

// ====================
//  ACCESS HTML BY DOM
// ====================

const searchBtn = document.getElementById('searchBtn'); //the Button to click to make a search
const citySearch = document.getElementById('citySearch'); //the input box ppl type their search into
const hisCon = document.getElementById('historyContainer'); //append gen'd History Buttons here
const cityBox = document.getElementById('cityBox'); //displays the current weather of the city
const gibFCCs = document.getElementById('gibFCCs'); //append forecast weather cards to this container


// ====================
//   INITIALIZATIONS
// ====================

const APIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,daily,alerts&appid=3b3319e2a4bdc403d7f45843c07de674';

// ====================
//      FUNCTIONS
// ====================

//Gets called by clicking the button. 
//Gathers the input'd info, sanitizes it, then
//Bifurcates and passes info into //History and into //getAPI
function btnGO(e) {
    // e.preventDefault();

    //Sanitize search inputs
    var cityName = String(citySearch.value);
    if (cityName == "") {
        return;
    } else if (cityName == undefined) {
        return console.log('Input was undefined');
    } else if (/\d/.test(cityName)) {
        return console.log('No Numbers Please');
    } else if (/(?!,)(?! )\W|_/.test(cityName)) {
        return console.log('No Odd Characters Please');
    } else {
        console.log('You searched for: ' + cityName);
    }
    
    // generate a History Button
    genHB(cityName);

    //fetch from the Weather API
    fetchAPI();
};

//Generates a History Button
function genHB(cityName) {

    let freshBtn = document.createElement('button');
    freshBtn.type = 'button';
    freshBtn.classList.add('btn', 'btn-light', 'btn-block', 'btntizeMe');
    freshBtn.innerHTML = cityName;

    //freshBtn.addEventListener("click", fetchAPI); //Just goes straight to fetchAPI and skips all the other stuff

    hisCon.appendChild(freshBtn);
};


//Uses the initialized APIurl to make a request for data
//TODO: make initialized APIurl change-able with input
function fetchAPI() {

  fetch(APIurl)

    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      console.log(data);
    //   for (var i = 0; i < data.length; i++) {
    //     var userName = document.createElement('h3');
    //     var issueTitle = document.createElement('p');
    //     userName.textContent = data[i].user.login;
    //     issueTitle.textContent = data[i].title;
    //     issueContainer.append(userName);
    //     issueContainer.append(issueTitle);
    //   }
        console.log(data.current.temp);
    });
};

//Adds event listener to search button
searchBtn.addEventListener("click", btnGO);

