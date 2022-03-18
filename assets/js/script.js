/*WELCOME DIV - Welcome/Form elements */
var welcomeEl = document.getElementById("welcome");

/* USER FORM - Declare User Form Variable */
var userFormEl = document.getElementById("user-form");

/* NAME INPUT - Form Input where User inputs Name */
var nameInputEl = document.querySelector(".form-input");

/* CAT IMAGE DIV - Area where cat images will load */
var catTitleEl = document.getElementById("start-title");

/* CAT IMAGES - Element for cat images */
var catPicsEl = document.getElementById("cat-pics");

/* CAT VOTING BUTTONS - Buttons to vote on cat image */
var catVotingEl = document.getElementById("buttons");

/* CAT NAME GENERATOR - Area where name generator will start */
var catNameGeneratorEl = document.getElementById("name-generator");

// Function that starts when submit button is clicked
var startFunction = function (event) {
  event.preventDefault();

  // Sets name equal to the value of the name input element (trims any spaces)
  var name = nameInputEl.value.trim();

  console.log(name);

  // Conditional for name being an input - then run the cat image generator function
  if (name) {
    catImageGenerator();

    /* LOCAL STORAGE - Setting Up localStorage to grab name */
    let userNameInfo = JSON.parse(localStorage.getItem(name)) || [];

    // Setting up localStorage for the userName - this will contain the user.value()
    var userName = {
      userInput: name,
    };
    userNameInfo.push(userName);
    localStorage.setItem("User Name", JSON.stringify(userNameInfo));
  }
};

// Cat Image Generator
var catImageGenerator = function () {
  // Hide the Welcome element for the user
  hide(welcomeEl);

  // Set the Cat API URL - this will randomly generate a cat image
  var theCatAPIURL = "https://api.thecatapi.com/v1/images/search";

  // Fetch The Cat API URL and then do the following if the response is ok
  fetch(theCatAPIURL, {
    headers: { "x-api-key": "e0f87712-5e34-4cf6-b2b4-27764dde618c" },
  }).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(data[0].url);

        var inputName = localStorage.getItem("User Name");
        console.log(inputName);

        // Adds in dynamic HTML that addresses the user by their name
        catTitleEl.innerHTML =
          "<h3> Hi there " +
          inputName +
          "," +
          " what do you think about this cat? </h3> ";

        //Adds in dynamic HTML that shows a random cat image with a fixed width and height ratio
        catPicsEl.innerHTML =
          "<img src= " +
          data[0].url +
          " width ='400' height='500' class='catpics'>";

        // Adds in a "yes" or "no" voting button for the cat image
        catVotingEl.innerHTML =
          "<button class = 'btn' id= 'yesBtn'><i class = 'fa fa-check'></i> Purrfect! </button>" +
          "<button class = 'btn' id='noBtn'><i class = 'fa fa-close'></i> Pawsitively Not! </button>";

        /* CAT VOTING BUTTONS (YES) - Yes button to vote on cat image */
        var voteYesEl = document.getElementById("yesBtn");

        /* CAT VOTING BUTTONS (NO)  - No button to vote on cat image */
        var voteNoEl = document.getElementById("noBtn");

        // When user clicks the yes button under the cat image - run the following function
        voteYesEl.addEventListener("click", yesBtnFunction);

        // When the user clicks on the no button under the cat image - run the following function
        voteNoEl.addEventListener("click", noBtnFunction);

        console.log("All good!");
      });
      // Yes Button Function
      var yesBtnFunction = function () {
        console.log("Yes Button Clicked!");

        // Runs the cat image selected function
        catImageSelected();
      };

      // No Button Function
      var noBtnFunction = function () {
        console.log("No Button Clicked!");

        // Runs the cat image generator function again
        catImageGenerator();
      };

      // Runs when cat image is selected
      var catImageSelected = function () {
        hide(catVotingEl);
        hide(catPicsEl);
        hide(catTitleEl);

        // var catImgData = catPicsEl.innerHTML.getAttribute("src");

        // console.log(catImgData);

        /* LOCAL STORAGE - Setting up localStorage to grab image URL */
        let catPictureURL =
          JSON.parse(localStorage.getItem(catPicsEl.innerHTML)) || [];

        // Setting up localStorage for the image URL - this will contain the cat image URL that the user picks.
        var userCatSelection = { selectedURL: catPicsEl.innerHTML };

        catPictureURL.push(userCatSelection);
        localStorage.setItem("Cat Image URL", JSON.stringify(catPictureURL));

        catNameGenerator();
      };
    } else {
      // Console log if error
      console.log("Help!");
    }
  });
};

// Cat Name Generator will start here
var catNameGenerator = function () {
  catNameGeneratorEl.innerHTML =
    "<h3> Now that you have a furry friend picked out, decide on a name! </h3>";
};

// Hide Elements
function hide(element) {
  element.style.display = "none";
}

// Show Element
function show(element) {
  element.style.display = "block";
}
// When user clicks the submit button on the user form - run the following function
userFormEl.addEventListener("submit", startFunction);
