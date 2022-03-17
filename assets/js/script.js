/*WELCOME DIV - Welcome/Form elements */
var welcomeEl = document.getElementById("welcome");

/* USER FORM - Declare User Form Variable */
var userFormEl = document.getElementById("user-form");

/* NAME INPUT - Form Input where User inputs Name */
var nameInputEl = document.querySelector(".form-input");

/* LOCAL STORAGE - Setting Up localStorage to grab name */
let userNameInfo = JSON.parse(localStorage.getItem(name)) || [];

/* FOOD IMAGE DIV - Area where food images will load */
var foodTitleEl = document.getElementById("food-title");

/* FOOD IMAGES - P element for food images */
var foodPicsEl = document.getElementById("foodpics");

/* FOOD VOTING BUTTONS - Buttons to vote on food image */
var foodVotingEl = document.getElementById("buttons");

// Function that starts when submit button is clicked
var startFunction = function (event) {
  event.preventDefault();

  var name = nameInputEl.value.trim();

  console.log(name);

  // Gets value from the name input element
  if (name) {
    foodImageGenerator();
    // Clear out old content so user can re-submit information
    nameInputEl.value = "";
  }
};

// Foodish Image Generator
var foodImageGenerator = function () {
  hide(welcomeEl);
  // Test that function is working with an alert
  var foodishURL = "https://foodish-api.herokuapp.com/";
  var name = nameInputEl.value.trim();
  console.log(foodishURL);
  fetch(foodishURL).then(function (response) {
    if (response.ok) {
      // Adds in dynamic HTML that addresses the user by their name
      foodTitleEl.innerHTML =
        "<h3> Hi there " +
        name +
        "," +
        " what do you think about this dish? </h3> ";

      //Adds in dynamic HTML that shows a random food image
      foodPicsEl.innerHTML = "<img src= " + foodishURL + ">";

      //   var foodPic = document.createElement("img");
      //   foodPic.setAttribute("src", foodishURL);

      // Adds in a "yes" or "no" voting button for the food image
      foodVotingEl.innerHTML =
        "<button class = 'btn' id= 'yesBtn'> Like It! </button>" +
        "<button class = 'btn' id='noBtn'> Dislike It! </button>";

      /* FOOD VOTING BUTTONS (YES) - Yes button to vote on food image */
      var voteYesEl = document.getElementById("yesBtn");
      /* FOOD VOTING BUTTONS (NO)  - No button to vote on food image */
      var voteNoEl = document.getElementById("noBtn");
      
      // When user clicks the yes button under the food image - run the following function
      voteYesEl.addEventListener("click", console.log("You clicked yes!"));
      // When the user clicks on the no button under the food image - run the following function
      voteNoEl.addEventListener("click", console.log("You clicked no!"));
      console.log("All good!");
    } else {
      console.log("Help!");
    }
  });
};

// Setting up localStorage for the userName - this will contain the user.value()
var userName = {
  userInput: name,
};
userNameInfo.push(userName);
localStorage.setItem("username", JSON.stringify(userNameInfo));

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
