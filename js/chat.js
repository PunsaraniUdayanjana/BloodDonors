
// Get HTML elements

const settingsButton = document.getElementById("settingsButton");
const settingsMenu = document.getElementById("settingsMenu");

const themeButton = document.getElementById("themeButton");

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messageArea = document.getElementById("messageArea");

const searchChat = document.getElementById("searchChat");

const conversations = document.querySelectorAll(".conversation");

let isBlocked = false;


// OPEN AND CLOSE SETTINGS MENU

settingsButton.addEventListener("click", function () {

    settingsMenu.classList.toggle("show");

});


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", function (event) {

    if (!settingsButton.contains(event.target) &&
        !settingsMenu.contains(event.target)) {

        settingsMenu.classList.remove("show");

    }

});


// DARK AND LIGHT MODE

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i> Light mode';

    } else {

        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i> Dark mode';

    }

    settingsMenu.classList.remove("show");

});


// SELECT A CONVERSATION

conversations.forEach(function (conversation) {

    conversation.addEventListener("click", function () {

        conversations.forEach(function (item) {
            item.classList.remove("active");
        });

        conversation.classList.add("active");

        const name = conversation.dataset.name;
        const blood = conversation.dataset.blood;

        document.getElementById("chatUserName").textContent = name;

        document.getElementById("chatBloodGroup").textContent =
            "Blood Group: " + blood;

        document.querySelector(".chat-header .user-avatar").textContent =
            name.charAt(0);

        isBlocked = false;

    });

});


// SEARCH CONVERSATIONS

searchChat.addEventListener("input", function () {

    const searchValue = searchChat.value.toLowerCase();

    conversations.forEach(function (conversation) {

        const name = conversation.dataset.name.toLowerCase();

        if (name.includes(searchValue)) {

            conversation.style.display = "flex";

        } else {

            conversation.style.display = "none";

        }

    });

});


// SEND MESSAGE

messageForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const messageText = messageInput.value.trim();

    if (messageText === "") {
        return;
    }

    if (isBlocked) {
        alert("You cannot send messages to this blocked user.");
        return;
    }

    // Create a new message

    const newMessage = document.createElement("div");

    newMessage.classList.add("message", "sent");

    const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    newMessage.innerHTML = `
        <p></p>
        <span>${currentTime}</span>
    `;

    // Use textContent to safely display the message

    newMessage.querySelector("p").textContent = messageText;

    messageArea.appendChild(newMessage);

    messageInput.value = "";

    // Scroll to the latest message

    messageArea.scrollTop = messageArea.scrollHeight;

});


// REPORT USER

document.getElementById("reportButton").addEventListener("click", function () {

    const userName =
        document.getElementById("chatUserName").textContent;

    alert("Report option selected for " + userName +
          ". Reporting will be connected to the database later.");

    settingsMenu.classList.remove("show");

});


// BLOCK USER

document.getElementById("blockButton").addEventListener("click", function () {

    const userName =
        document.getElementById("chatUserName").textContent;

    const confirmBlock = confirm(
        "Are you sure you want to block " + userName + "?"
    );

    if (confirmBlock) {

        isBlocked = true;

        alert(userName + " is blocked in this demo.");

    }

    settingsMenu.classList.remove("show");

});
