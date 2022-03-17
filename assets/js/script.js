/* USER FORM - Declare User Form Variable */
var userFormEl = document.getElementById("user-form");

/* NAME INPUT - Form Input where User inputs Name */
var nameInputEl = document.querySelector(".form-input");

/* LOCAL STORAGE - Setting Up localStorage to grab name */
let userNameInfo = JSON.parse(localStorage.getItem(name)) || [];

/* FOOD IMAGE LOCATION - Area where food images will load */
var foodContentEl = document.getElementById("food-content");

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
  // Test that function is working with an alert
  var foodishURL = "https://foodish-api.herokuapp.com/";

  console.log(foodishURL);
  fetch(foodishURL).then(function (response) {
    if (response.ok) {
      var foodPic = document.createElement("img");
      foodPic.setAttribute("src", foodishURL);

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
localStorage.setItem("name", JSON.stringify(userNameInfo));

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
