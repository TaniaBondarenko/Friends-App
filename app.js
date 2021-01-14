const urlInit = 'https://randomuser.me/api/?results=10&&?inc=gender,name,location,email,cell,picture';
const friendsContainer = document.querySelector(".friends_container");
const friendCard = document.createElement("div");
friendCard.setAttribute("class", "friend_card");
let friendsData;
let friendName;
let friendPhoto;
let friendLocation;
let friendCont; 
let friendGender;

fetch(urlInit)
        .then(response => response.json())
        .then((data) => {
                friendsData = data.results[0];   
                //addFriendsDataToCard();   
                //detectGender();
        })
        .then(() => addFriendsDataToCard())
        .then(() =>detectGender())
        .catch(err => {
                console.log("Oops... Something went wrong.\n Reload")
        });



function addFriendsDataToCard() {
        friendName = (`${friendsData.name.first} ${friendsData.name.last}`).toUpperCase();
        friendPhoto = friendsData.picture.large;
        friendLocation = friendsData.location.city;
        friendCont = `${friendsData.email}\n${friendsData.cell}`;
        friendGender = friendsData.gender;
        let innerText = `<div class="name">${friendName}</div>
                                <div class="photo"><img src="${friendPhoto}"></div>
                                <div class="info_block">
                                <div class="place">${friendLocation}</div>
                                <div class="contacts">${friendCont}</div><hr>
                                <div class="gender">${friendGender}</div>
                                </div>`;
        friendCard.innerHTML = innerText;
       friendsContainer.appendChild(friendCard);
}

function detectGender() {
        if (friendGender === "female") {
                let sex = document.querySelector(".friend_card");
                sex.classList.add("female");
        }
}
