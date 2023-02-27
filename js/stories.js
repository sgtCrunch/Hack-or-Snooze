"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  let star = "";
  let deleteLink = "";
  let favClass = "";
 
  if(currentUser){
    favClass = currentUser.isFavorite(story.storyId) ? "fa" : "far";
    star = `<i class="star ${favClass} fa-star"></i>`;
    if(currentUser.username === story.username){
      deleteLink = `<a class="delete"> (remove) </a>`;
    }
  }

  return $(`
      <li id="${story.storyId}">
        ${star}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small><br>
        <small class="story-author">by ${story.author}</small><br>
        <small class="story-user">posted by ${story.username}</small>
        ${deleteLink}
        <hr>
      </li>
      
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $('.star').on("click", handleFavClick);
  $('.delete').on("click", handleDeleteClick);
  
  $allStoriesList.show(1000);
}

function putFavStoriesOnPage() {
  console.debug("putFavStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    if(currentUser.isFavorite(story.storyId)){
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  }

  $('.star').on("click", handleFavClick);
  $('.delete').on("click", handleDeleteClick);
  
  $allStoriesList.show(1000);
}

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    if(currentUser.username === story.username){
      const $story = generateStoryMarkup(story);
      $allStoriesList.append($story);
    }
  }

  $('.star').on("click", handleFavClick);
  $('.delete').on("click", handleDeleteClick);
  
  $allStoriesList.show(1000);
}


/** Handle Add Story form submission.*/
async function addStorySubmision(e){
  
  e.preventDefault();

  if(!currentUser) return;
  const title = $("#story-title").val();
  const author = $("#story-author").val();
  const url = $("#story-url").val();

  await storyList.addStory(currentUser, {title, author, url});
  putStoriesOnPage();
  $addStoryForm.trigger("reset");
  $addStoryForm.hide();


}

$addStoryForm.on('submit', addStorySubmision);
