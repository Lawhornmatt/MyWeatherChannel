// ====================
//      IMPORTS
// ====================

//import * as X from "Y";

// ====================
//  ACCESS HTML BY DOM
// ====================

const fetchBtn = document.getElementById('fetchBtn');
const citySearch = document.getElementById('citySearch');
const cityBox = document.getElementById('cityBox');
const gibFCCs = document.getElementById('gibFCCs');


// ====================
//   INITIALIZATIONS
// ====================

const APIurl = 'https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,daily,alerts&appid={3b3319e2a4bdc403d7f45843c07de674}';


// ====================
//      FUNCTIONS
// ====================

function getAPI() {

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
}

function btnGO(e) {
    // e.preventDefault();
    var cityName = citySearch.value;
    console.log(cityName);
};

fetchBtn.addEventListener("click", btnGO)

