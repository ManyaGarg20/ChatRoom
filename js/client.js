  
const socket= io('http://localhost:7000') ;

var audio = new Audio('messagePop.mp3');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

let name = prompt("Enter Your Name: ");
socket.emit('new-user-joined',name);
document.getElementById("user").innerHTML= name;

// when ever append , then a div is created
const append = (message,position)=>{
      const messageEl = document.createElement('div');
      messageEl.innerText=message;
      messageEl.classList.add('message');
      messageEl.classList.add(position);
messageContainer.append(messageEl);
if(position=='left'){
    audio.play();
}
}

socket.on('user-joined' , name=>{
append(`${name} joined the chat!`,'left');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault(); // to stop page reload ,when form is submitted
  const message = messageInput.value;
  append(`You: ${message}`,'right');
  socket.emit('send',message);
  messageInput.value="";
}) ;

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left',name=>{
    append(`${name}: LEFT`,'left');
})
