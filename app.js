const numOfFriends=10;
const urlInit = `https://randomuser.me/api/?results=${numOfFriends}`;
const friendsContainer = document.querySelector(".friends_container");
const friendCard = document.querySelectorAll(".friend_card");
let friendsData;
let fullName;
let photo;
let position;
let email; 
let gender;
let age;
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

document.querySelector(".sidebar").addEventListener("click", clickButton);

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

let isFiltered = false;
let justMale;
let justFemale;
function letFilter() {
        initState();
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

async function sortByAges(arr) {
        console.log(arr);
        await  
                arr.forEach(el=>el.dob.age).sort((a, b) => a.dob.age.localeCompare(b.dob.age));
        
        console.log(a.dob.age);
};
 
document.querySelector(".search").addEventListener("keyup", makeSearch);

function makeSearch() {      
        const searchValue = document.querySelector(".search").value.toLowerCase();
        let arrForFilter;
        if (isFiltered && document.getElementById("male").checked) {
                arrForFilter = justMale;
        } if (isFiltered && document.getElementById("female").checked) {
                arrForFilter = justFemale;
        } if (!isFiltered) {
                arrForFilter = friendsData;
        }      
        const filteredStr = arrForFilter.filter((elem) => {
                return (
                        elem.name.last.toLowerCase().includes(searchValue) ||
                        elem.name.first.toLowerCase().includes(searchValue)
                );
               
        })
        initState();
        addFriends(filteredStr);
}


window.addEventListener("load", fetchFriend);
//setTimeout(()=> detectGender(),1000);



