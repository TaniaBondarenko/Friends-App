const NUM_OF_FRIENDS = 20;
const FRIENDS = document.querySelector(".friends");
let sortedFriends;
let allFriends;
let isFilteredByGender = false;

function fetchFriends() {
  const apiUrl = `https://randomuser.me/api/?results=${NUM_OF_FRIENDS}`;
  fetch(apiUrl)
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => (allFriends = data.results))
    .then(() => renderFriends(allFriends))
    .catch(showErrorMessage);
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function showErrorMessage() {
  document.body.innerHTML = `<div class="errorMessage">Ops...Something went wrong.</div>`;
}

function renderFriends(friendsToBeAdded) {
  FRIENDS.innerHTML = " ";
  let fragment = document.createDocumentFragment();
  friendsToBeAdded.forEach((friend) => {
    let friendCard = document.createElement("div");
    friendCard.setAttribute("class", "friend_card");
    friendCard.innerHTML = `
    <div class="card_wrapper ${friend.gender}">
        <p class="name ">${`${friend.name.first} ${friend.name.last}`}</p>
        <div class="photo">
           <img src="${friend.picture.large}">
         </div>
        <div class="info_block">
            <p class="age">Age ${friend.dob.age}</p>
            <p class="place">${friend.location.city}</p>
            <div class="email">
                <a href="mailto:${friend.mail}" class="email_link">${friend.email}</a>
            </div>
            <p class="gender">${friend.gender}</p>
        </div>
    </div>
`;
    fragment.appendChild(friendCard);
  });
  FRIENDS.appendChild(fragment);
}

document.querySelector(".sortPanel").addEventListener("click", handleUserInput);

function handleUserInput({ target }) {
  switch (target.value) {
    case "nameUp":
      sortedFriends = allFriends.sort((a, b) => sortByName(a, b));
      break;
    case "nameDown":
      sortedFriends = allFriends.sort((a, b) => sortByName(b, a));
      break;
    case "ageUp":
      sortedFriends = allFriends.sort((a, b) => sortByAge(a, b));
      break;
    case "ageDown":
      sortedFriends = allFriends.sort((a, b) => sortByAge(b, a));
      break;
  }
  if (isFilteredByGender) {
    let checkedValue = document.querySelector("input[name=filter]:checked").value;
    renderFriends(sortedFriends.filter((el) => el.gender === checkedValue));
  } else {
    renderFriends(allFriends);
  }
}

function sortByName(a, b) {
  return a.name.first.localeCompare(b.name.first);
}

function sortByAge(a, b) {
  return a.dob.age - b.dob.age;
}

document.querySelector(".filter").addEventListener("click", filterByGender);

function filterByGender({ target }) {
  if (target.value === "all") {
    renderFriends(allFriends);
    isFilteredByGender = false;
  } else {
    sortedFriends = allFriends.filter((el) => el.gender === target.value);
    renderFriends(sortedFriends);
    isFilteredByGender = true;
  }
}

document.querySelector(".search").addEventListener("keyup", doValidSearch);

function doSearch(friendsForSearch) {
  const searchValue = document.querySelector(".search").value.toLowerCase();
  let friendsAccordingToSearch = friendsForSearch.filter((elem) => {
    return elem.name.last.toLowerCase().startsWith(searchValue, 0) || elem.name.first.toLowerCase().startsWith(searchValue);
  });
  renderFriends(friendsAccordingToSearch);
}

function doValidSearch() {
  if (isFilteredByGender) {
    doSearch(sortedFriends);
  } else {
    doSearch(allFriends);
  }
}

window.addEventListener("load", fetchFriends);
