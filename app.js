const NUM_OF_FRIENDS = 20;
const FRIENDS = document.querySelector(".friends");
let allFriends;
let friendsForFilter;
let isFiltered = false;
let justMale;
let justFemale;

function makeContainerEmpty() {
  let innerText = " ";
  FRIENDS.innerHTML = innerText.replace(innerText, " ");
}

function fetchFriends() {
  const api_url = `https://randomuser.me/api/?results=${NUM_OF_FRIENDS}`;
  fetch(api_url)
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
  const wholePage = document.querySelector("body");
  wholePage.setAttribute("class", "refresh");
  wholePage.innerHTML = `<div>Ops...Something went wrong.</div>
        <div>Refresh the page to start finding friends</div>`;
}

function addFriends(friendsToBeAdded) {
  let fragment = document.createDocumentFragment();
  friendsToBeAdded.forEach((friend) => {
    let friendCard = document.createElement("div");
    friendCard.setAttribute("class", "friend_card");
    friendCard.innerHTML = `<div class="card_wrapper ${
      friend.gender
    }"><div class="name ">${`${friend.name.first} ${friend.name.last}`}</div>
                                <div class="photo"><img src="${
                                  friend.picture.large
                                }"></div>
                                <div class="info_block">
                                <div class="age">Age ${friend.dob.age}</div>
                                <div class="place">${friend.location.city}</div>
                                <div class="email"><a href="mailto:${
                                  friend.mail
                                }" class="email_link">${friend.email}</a></div>
                                <div class="gender">${friend.gender}</div>
                                </div></div>
                                `;
    fragment.appendChild(friendCard);
  });
  FRIENDS.appendChild(fragment);
}

document.querySelector(".sidebar").addEventListener("click", sortFriends);

function sortFriends({ target }) {
  chooseAppropriateFriends();
  console.log(friendsForFilter);
  const nameUp = "ascendent_by_name";
  const nameDown = "descendent_by_name";
  const ageUp = "ascendent_by_age";
  const ageDown = "descendent_by_age";
  switch (target.className || target.id) {
    case nameUp:
      friendsForFilter.sort((a, b) => a.name.first.localeCompare(b.name.first));
      redrawfriends();
      break;
    case nameDown:
      friendsForFilter.sort((a, b) => b.name.first.localeCompare(a.name.first));
      redrawfriends();
      break;
    case ageUp:
      friendsForFilter.sort((a, b) => a.dob.age - b.dob.age);
      redrawfriends();
      break;
    case ageDown:
      friendsForFilter.sort((a, b) => b.dob.age - a.dob.age);
      redrawfriends();
      break;
  }
}

let genderFilter = document.querySelector(".filter");
genderFilter.addEventListener("click", doFilter);

function doFilter({ target }) {
  makeContainerEmpty();
  console.log(target);
  if (target.value === "male") {
    justMale = allFriends.filter((el) => el.gender === "male");
    addFriends(justMale);
    isFiltered = true;
  } else if (target.value === "female") {
    justFemale = allFriends.filter((el) => el.gender === "female");
    addFriends(justFemale);
    isFiltered = true;
  } else if (target.value === "all") {
    addFriends(allFriends);
    isFiltered = false;
  }
}

function redrawfriends() {
  makeContainerEmpty();
  addFriends(friendsForFilter);
}

document.querySelector(".search").addEventListener("keyup", makeSearch);

function chooseAppropriateFriends() {
  if (isFiltered && document.getElementById("male").checked) {
    friendsForFilter = justMale;
  }
  if (isFiltered && document.getElementById("female").checked) {
    friendsForFilter = justFemale;
  }
  if (!isFiltered) {
    friendsForFilter = allFriends;
  }
}

function makeSearch() {
  const searchValue = document.querySelector(".search").value.toLowerCase();
  chooseAppropriateFriends();
  const friendsAccordingToSearch = friendsForFilter.filter((elem) => {
    return (
      elem.name.last.toLowerCase().startsWith(searchValue, 0) ||
      elem.name.first.toLowerCase().startsWith(searchValue)
    );
  });
  makeContainerEmpty();
  addFriends(friendsAccordingToSearch);
}

window.addEventListener("load", fetchFriends);
