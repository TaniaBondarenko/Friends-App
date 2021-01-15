const numOfFriends=4;
const urlInit = `https://randomuser.me/api/?results=${numOfFriends}`;
const friendsContainer = document.querySelector(".friends_container");

let friendsData;
let fullName;
let photo;
let position;
let contacts; 
let gender;

function addFriend() {
        fetch(urlInit)
                .then(response => response.json())
                .then((data) => {
                        for (i = 0; i < numOfFriends; i++) {
                                friendsData = data.results;//array of objects
                        }
                })
                .then(() => addFriendsDataToCard())
                .catch(err => {
                        console.log("Oops... Something went wrong.\n Reload")
                });
       
        return friendsData;

};

async function addFriendsDataToCard() {
        try {
                let innerText; let innerTextStr = " ";
                await friendsData.forEach(friend => {
                        fullName = (`${friend.name.first} ${friend.name.last}`).toUpperCase();
                        photo = friend.picture.large;
                        position = friend.location.city;
                        contacts = `${friend.email}\n${friend.cell}`;
                        gender = friend.gender;
                        innerText = `<div class="friend_card">
                                <div class="name">${fullName}</div>
                                <div class="photo"><img src="${photo}"></div>
                                <div class="info_block">
                                <div class="place">${position}</div>
                                <div class="contacts">${contacts}</div><hr>
                                <div class="gender">${gender}</div>
                                </div>
                                </div>
                                `;
                        innerTextStr += innerText;
                       
                        
                });
                friendsContainer.innerHTML = innerTextStr;
                console.log(friendsData);
        } catch (error) {
                console.log("Can't get all your friends")
        }
}

function detectGender() {
        let sex = Array.from(document.querySelectorAll(".friend_card"));
        for (let i = 0; i < numOfFriends;i++) {
                if (friendsData[i].gender === "female") {
                        sex[i].classList.add("female");
                } else {
                        sex[i].classList.add("male");
                }
        };
};


window.addEventListener("load", addFriend);
setTimeout(()=> detectGender(),1000);



