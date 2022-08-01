// ====================
//      IMPORTS
// ====================

//import * as X from "Y";

// ====================
//  ACCESS HTML BY DOM
// ====================

const fetchBtn = $('#fetchBtn');
const cityBox = $('#cityBox');
const gibFCCs = $('#gibFCCs');


// ====================
//   INITIALIZATIONS
// ====================

const APIurl = 'https://api.github.com/repos/IBM/clai/issues?per_page=5';


// ====================
//      FUNCTIONS
// ====================

function getAPI() {

  fetch(requestUrl)

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
    });
}

fetchBtn.on('click', getAPI);

