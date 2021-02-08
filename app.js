const NUM_OF_FRIENDS = 8;
const FRIENDS = document.querySelector(".friends");
let allFriends;
let friendsForFilter;
let isFiltered = false;
let justMale;
let justFemale;

function fetchFriends() {
  const apiUrl = `https://randomuser.me/api/?results=${NUM_OF_FRIENDS}`;
  fetch(apiUrl)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => (allFriends = data.results))
    .then(() => addFriends(allFriends))
    .catch((error) => showErrorMessage());
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function showErrorMessage() {
  const wholePage = document.body;
  wholePage.innerHTML = `<div class="refresh"><div>Ops...Something went wrong.</div>
        <div>Refresh the page to start finding friends</div></div>`;
}

function addFriends(friendsToBeAdded) {
  let fragment = document.createDocumentFragment();
  friendsToBeAdded.forEach((friend) => {
    let friendCard = document.createElement("div");
    friendCard.setAttribute("class", "friend_card");
    friendCard.innerHTML = `<div class="card_wrapper ${friend.gender}"><div class="name ">${`${friend.name.first} ${friend.name.last}`}</div>
                                <div class="photo"><img src="${friend.picture.large}"></div>
                                <div class="info_block">
                                <div class="age">Age ${friend.dob.age}</div>
                                <div class="place">${friend.location.city}</div>
                                <div class="email"><a href="mailto:${friend.mail}" class="email_link">${friend.email}</a></div>
                                <div class="gender">${friend.gender}</div>
                                </div></div>
                                `;
    fragment.appendChild(friendCard);
  });
  FRIENDS.appendChild(fragment);
}

document.querySelector(".sortPanel").addEventListener("click", showSorteredFriends);

function makeContainerEmpty() {
  let innerText = " ";
  FRIENDS.innerHTML = innerText.replace(innerText, " ");
}

function showSorteredFriends({ target }) {
  switch (target.value) {
    case "nameUp":
      sortByNameUp();

      break;
    case "nameDown":
      sortByNameDown();

      break;
    case "ageUp":
      sortByAgeUp();

      break;
    case "ageDown":
      sortByAgeDown();

      break;
  }
}

const maleRadioButton = document.getElementById("male");
const femaleRadioButton = document.getElementById("female");
const allRadioButton = document.getElementById("all");
let sortedFriends;
function sortByNameUp() {
  makeContainerEmpty();
  if (maleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => a.name.first.localeCompare(b.name.first)).filter((el) => el.gender === "female");
  } else if (femaleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => a.name.first.localeCompare(b.name.first)).filter((el) => el.gender === "female");
  } else if (allRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => a.name.first.localeCompare(b.name.first));
  }
  addFriends(sortedFriends);
}

function sortByNameDown() {
  makeContainerEmpty();
  if (maleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => b.name.first.localeCompare(a.name.first)).filter((el) => el.gender === "male");
  } else if (femaleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => b.name.first.localeCompare(a.name.first)).filter((el) => el.gender === "female");
  } else if (allRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => b.name.first.localeCompare(a.name.first));
  }
  addFriends(sortedFriends);
}

function sortByAgeUp() {
  makeContainerEmpty();
  if (maleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => a.dob.age - b.dob.age).filter((el) => el.gender === "male");
  } else if (femaleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => a.dob.age - b.dob.age).filter((el) => el.gender === "female");
  } else if (allRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => a.dob.age - b.dob.age);
  }
  addFriends(sortedFriends);
}

function sortByAgeDown() {
  makeContainerEmpty();
  if (maleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => b.dob.age - a.dob.age).filter((el) => el.gender === "male");
  } else if (femaleRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => b.dob.age - a.dob.age).filter((el) => el.gender === "female");
  } else if (allRadioButton.checked) {
    sortedFriends = allFriends.sort((a, b) => b.dob.age - a.dob.age);
  }
  addFriends(sortedFriends);
}

document.querySelector(".filter").addEventListener("click", doFilter);

function doFilter({ target }) {
  makeContainerEmpty();
  if (target.value === "male") {
    sortedFriends = allFriends.filter((el) => el.gender === "male");
    isFiltered = true;
    addFriends(sortedFriends);
  } else if (target.value === "female") {
    sortedFriends = allFriends.filter((el) => el.gender === "female");
    isFiltered = true;
    addFriends(sortedFriends);
  } else if (target.value === "all") {
    addFriends(allFriends);
    isFiltered = false;
  }
}

document.querySelector(".search").addEventListener("keyup", makeValidSearch);

function makeSearch(friendsForSearch) {
  const searchValue = document.querySelector(".search").value.toLowerCase();
  let friendsAccordingToSearch = friendsForSearch.filter((elem) => {
    return elem.name.last.toLowerCase().startsWith(searchValue, 0) || elem.name.first.toLowerCase().startsWith(searchValue);
  });
  makeContainerEmpty();
  addFriends(friendsAccordingToSearch);
}

function makeValidSearch() {
  if (isFiltered) {
    makeSearch(sortedFriends);
  } else {
    makeSearch(allFriends);
  }
}

window.addEventListener("load", fetchFriends);
