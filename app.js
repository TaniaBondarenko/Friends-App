const numOfFriends=20;
const urlInit = `https://randomuser.me/api/?results=${numOfFriends}`;
const friendsContainer = document.querySelector(".friends_container");
let friendsData;
let arrForFilter;
let isFiltered = false;
let justMale;
let justFemale;


function initStateofFrContainer() {
        let innerText = " "; 
        friendsContainer.innerHTML=innerText.replace(innerText," ");
}

function fetchFriend() {
        fetch(urlInit)
                .then(response => response.json())
                .then((data) => {                         
                        for (i = 0; i < numOfFriends; i++) {
                                friendsData = data.results;
                        }
                })
                .then(() => addFriends(friendsData))
                .catch(err => {
                        console.log("Oops... Something went wrong.\n Reload")
                });
       
        return friendsData;

};

async function addFriends(arr) {
        let fragment = document.createDocumentFragment();
        await arr.forEach(friend => {
                let friendCard = document.createElement("div");
               friendCard.setAttribute("class", "friend_card");
                friendCard.innerHTML = `<div class="name ${friend.gender}">${(`${friend.name.first} ${friend.name.last}`).toUpperCase()}</div>
                                <div class="photo"><img src="${friend.picture.large}"></div>
                                <div class="info_block ${friend.gender}">
                                <div class="age">Age ${friend.dob.age}</div>
                                <div class="place">${friend.location.city}</div>
                                <div class="email"><a href="mailto:${friend.mail}">${friend.email}</a></div><hr>
                                <div class="gender">${friend.gender}</div>
                                </div>
                                `;
                fragment.appendChild(friendCard);       
        });
        friendsContainer.appendChild(fragment);
};

document.querySelector(".sidebar").addEventListener("click", sortAndFilter);

function sortAndFilter({ target }) {
        checkCorrectArray();
        switch (target.className||target.id) {
                case "ascendent_by_name":
                        arrForFilter.sort((a, b) => a.name.first.localeCompare(b.name.first));
                        break;
                case "descendent_by_name":
                        arrForFilter.sort((a, b) => b.name.first.localeCompare(a.name.first));
                        break;
                case "ascendent_by_age":
                        arrForFilter.sort((a, b) => a.dob.age - (b.dob.age));
                        break;
                case "descendent_by_age":
                        arrForFilter.sort((a, b) => b.dob.age-(a.dob.age));
                        break;
                case "male":
                case "female":
                case "all":
                        letFilter();
                        break;      
        }
        redrawFriendsContainer();    
}

function letFilter() {
        initStateofFrContainer();
        if (document.getElementById("male").checked) {
                justMale = friendsData.filter(el => el.gender === "male");
                addFriends(justMale);
                isFiltered = true;
        } else if (document.getElementById("female").checked) {
                justFemale = friendsData.filter(el => el.gender === "female");
                addFriends(justFemale);
                isFiltered = true;
        } else if (document.getElementById("all").checked) {
                addFriends(friendsData);
                isFiltered = false;
        }
}

function redrawFriendsContainer() {
        initStateofFrContainer();
        addFriends(arrForFilter);
}
 
document.querySelector(".search").addEventListener("keyup", makeSearch);

function checkCorrectArray() {
        if (isFiltered && document.getElementById("male").checked) {
                arrForFilter = justMale;
        } if (isFiltered && document.getElementById("female").checked) {
                arrForFilter = justFemale;
        } if (!isFiltered) {
                arrForFilter = friendsData;
        }   
}

function makeSearch() {      
        const searchValue = document.querySelector(".search").value.toLowerCase();
        checkCorrectArray();
        const filteredStr = arrForFilter.filter((elem) => {
                return (
                        elem.name.last.toLowerCase().startsWith(searchValue,0) ||
                        elem.name.first.toLowerCase().startsWith(searchValue)
                );   
        })
        initStateofFrContainer();
        addFriends(filteredStr);
}

window.addEventListener("load", fetchFriend);


