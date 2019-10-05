//fetch the button from the DOM


function User (name, room , avatar) {
    this.name = name;
    this.room = room;
    this.avatar = avatar;
}

var list = [];

var system_avatar = "img/aviso.png"

var user = new User( "anom", "CHAT3", "img/spy.png");


/* EVENTS*/

/* depending on the avatar chosen, the user's avatar parameter will keep one image or another */
var avatar1 = document.querySelector("#img1").addEventListener("click", function(event) {

	  user.avatar = "img/spy.png";

	});
var avatar2 = document.querySelector("#img2").addEventListener("click", function(event) {

	  user.avatar = "img/Astronaut.png";

	});
var avatar3 = document.querySelector("#img3").addEventListener("click", function(event) {

	  user.avatar = "img/mickey.png";

	});


var submit = document.querySelector("#submitButton").addEventListener("click",onSubmit);

var sendButton = document.querySelector("#sendButton").addEventListener("click",onSendMessage);


/* Changes the room: closes the previous server, creates a new instance,
 adds the server methods and connects to the new room  */
var change = document.querySelector("#changeRoom").addEventListener("click", function(event) {


			var room = document.querySelector("#roomId").value;

			if (isEmpty(room)){

				alert("empty field");

			}

			else {

				elem = document.getElementById('chatRoom');

				user.room = room;

				room.value = "";

				elem.innerHTML = "Chat room: " + user.room;

				client.close();
				client = new SillyClient();
				client.on_ready = on_ready;
				client.on_message = on_message;
				client.on_user_conected = on_user_connected;
				client.on_user_disconnected = on_user_disconnected;
				client.on_close = on_close;
				client.connect("SENSIBLE_INFORMATION", user.room);

			}

	}
);


var sendButton = document.querySelector("#sendButton").addEventListener("click",onSendMessage);

var input = document.getElementById("msg");

/* Does click on button to call onSendMessage when enter key is presses */
input.addEventListener("keyup", function(event) {

	    event.preventDefault();
	    if (event.keyCode === 13) {
	        document.getElementById("sendButton").click();
	    }
	}
);



/*FUNCTIONS*/

/* Changes the look of the window, hidding the initial form page
 and showing the chat and canvas for the user to use */
function show(){

	var elem = document.getElementById('main');
	elem.style.display = 'block';
	elem = document.getElementById('initial_page');
	elem.style.visibility = 'hidden';
	textoCabecera.innerHTML = "Comunícate mediante el chat: ";
	elem = document.getElementById('chatRoom');
	elem.innerHTML= "Chat room: " + user.room;

}

function isEmpty(string){

	if ( string === "")
	{
	    return true;
	}
	else
		return false;
}

/*selects the values of the form elements and, if they are not empty,
  saves the chosen info and connects to a given room*/
function onSubmit(e){

	var name = document.querySelector("#usarname").value;
	var room = document.querySelector("#roomName").value;


		if (!isEmpty(name) &&  !isEmpty(room) ){

			user.name=name;
			user.room=room;

			show();

			client.connect( "SENSIBLE_INFORMATION", user.room );

			return true;

		}

		else
			alert("empty fields");

}


/* for every message received, a message bubble will be added to the messages box
 with an author, content and, in some cases, avatar */
function showMsg(username, content, avatar){

  var objDiv = document.getElementById("messages");

  if(!isEmpty(content)){

	  var chatDiv = document.getElementById('chatDiv');
	  var aux = chatDiv.cloneNode(true);

	  aux.querySelector(".boxname").innerText = username;
	  aux.querySelector(".boxmessage").innerText = content;
	  aux.querySelector(".avatar").src = avatar;
	  aux.querySelector(".avatar").height=40;
	  aux.querySelector(".avatar").width=40;

	  document.querySelector("div.chatbox__messages__user-message").appendChild(aux);

  }

  document.querySelector("#msg").value = "";

  /*messages box to be seen always at the last messages*/
  objDiv.scrollTop = objDiv.scrollHeight;

}

/* creates a json with the data of a sent message, calls the method to show it on window
 and sends it to the server so that it can be seen in the channel  */
function onSendMessage(e)

{
	if(!input.value)
		return;

	var data_json = {
		type: "message",
		username: user.name,
		avatar: user.avatar,
		content: input.value
	};

	showMsg(data_json.username + ":" , data_json.content , data_json.avatar);

	client.sendMessage( JSON.stringify( data_json ) );

	input.value = "";
}

/*function update(){

	list.push(data.username);

	var userList = document.querySelector(".chatbox__user-list");

	var user = document.querySelector(".chatbox__user--active");

	var aux = user.cloneNode(true);

	aux.style.display="block";

	aux.querySelector("p").innerHTML = data.username;

	userList.appendChild(aux);

}*/
