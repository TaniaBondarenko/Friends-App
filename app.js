const numOfFriends=10;
const urlInit = `https://randomuser.me/api/?results=${numOfFriends}`;
const friendsContainer = document.querySelector(".friends_container");
const friendCard = document.querySelectorAll(".friend_card");
let friendsData;
let fullName;
let photo;
let position;
let contacts; 
let gender;
let innerText = " "; 

function initState() {
        friendsContainer.innerHTML=innerText.replace(innerText," ");
}

function fetchFriend() {
        fetch(urlInit)
                .then(response => response.json())
                .then((data) => {
                         
                        for (i = 0; i < numOfFriends; i++) {
                                friendsData = data.results;//array of objects 
                        }
                        console.log(friendsData);
                })
                .then(() => addFriends(friendsData))
                .then(() => detectGender(friendsData))
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
                friendCard.innerHTML = `<div class="name">${(`${friend.name.first} ${friend.name.last}`).toUpperCase()}</div>
                                <div class="photo"><img src="${friend.picture.large}"></div>
                                <div class="info_block">
                                <div class="place">${friend.location.city}</div>
                                <div class="contacts">${`${friend.email}\n${friend.cell}`}</div><hr>
                                <div class="gender">${friend.gender}</div>
                                </div>
                                `;
                fragment.appendChild(friendCard);
        });
        friendsContainer.appendChild(fragment);
};

function detectGender(arr) {
        let sex = Array.from(document.querySelectorAll(".friend_card"));
        for (let i = 0; i < numOfFriends;i++) {
                if (arr[i].gender === "female") {
                        sex[i].classList.add("female");
                } else {
                        sex[i].classList.add("male");
                }
        };
};

const sidebar = document.querySelector(".sidebar");
sidebar.addEventListener("click", clickButton);


function clickButton({ target }) {
        switch (target.className||target.id) {
                case "ascendent_by_name":
                        console.log("click");
                        break;
                case "descendent_by_name":
                console.log("click,click");
                        break;
                case "ascendent_by_age":
                        console.log("click age");
                        break;
                case "descendent_by_age":
                        console.log("click click age");
                        break;
                case "male":
                case "female":
                case "all":
                        letFilter();
                        break;

        }

}

function letFilter() {
        initState();
        if (document.getElementById("male").checked) {
                const justMale = friendsData.filter(el => el.gender === "male");
                addFriends(justMale);
        } else if (document.getElementById("female").checked) {
                const justFemale = friendsData.filter(el => el.gender === "female");
                addFriends(justFemale);
        } else if (document.getElementById("all").checked) {
                addFriends(friendsData);
        }
}



window.addEventListener("load", fetchFriend);
//setTimeout(()=> detectGender(),1000);



