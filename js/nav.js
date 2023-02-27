"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** Show Add Story form with click on "Submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $addStoryForm.show(1000);
}

$navSubmit.on("click", navSubmitClick);

/** Show fav stories with click on "click" */

function navFavStoriesClick(evt) {
  console.debug("navFavStoriesClick", evt);
  hidePageComponents();
  putFavStoriesOnPage();
}

$navFavs.on("click", navFavStoriesClick);

/** Show my stories with click on "click" */

function navMyStoriesClick(evt) {
  console.debug("navMyStoriesClick", evt);
  hidePageComponents();
  putMyStoriesOnPage();
}

$navMyStories.on("click", navMyStoriesClick);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navSubmit.show();
  $navFavs.show();
  $navMyStories.show();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** When a user logs out, update the navbar to reflect that. */

function updateNavOnLogout() {
  $navFavs.hide();
  $navMyStories.hide();
  $navSubmit.hide();
}
