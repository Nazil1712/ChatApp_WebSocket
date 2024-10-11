const socket = io();
const sendBtn = document.getElementById("send-button");
const messageInput = document.getElementById("chat-input");
const ourMessages = document.getElementById("chat-window");

let currentUserId = null;

window.onload = function () {
    messageInput.focus();
};

socket.on("connect", () => {
  // console.log("Id of Socket on connection event",socket.id)
  currentUserId = socket.id;
});

socket.on("message-to-partner", (data) => {
  const p = document.createElement("p");
  p.innerText = data.message;
  console.log("data", data);
  console.log("Current UserID", currentUserId);
  console.log("Data UserID", data.userId);
  if (data.userId === currentUserId) {
    p.classList.add("message", "user"); 
  } else {
    p.classList.add("message", "other"); 
  }
  ourMessages.appendChild(p);
});

function sendMessage(e) {
  const message = messageInput.value;
  if (!(message == "" || message == null)) {
    socket.emit("user-message", { message, userId: currentUserId }); // Here we are sending message from frontend to backend
  }
  messageInput.value = "";
  messageInput.focus();
}

sendBtn.addEventListener("click", (e) => {
  sendMessage(e);
});

messageInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    sendMessage(e);
  }
});
