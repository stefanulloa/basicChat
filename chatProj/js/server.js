var client = new SillyClient();

var on_ready = client.on_ready = function( author_id ){

  showMsg( "", "system connected", system_avatar);

   var data_json = {
		type: "connected",
		username: user.name 
	};

  	client.sendMessage( JSON.stringify( data_json ) );
  

}

var on_error = client.on_error  = function( author_id ){
  showMsg( "", "system not connected", system_avatar );
}


var on_user_connected = client.on_user_connected  = function( author_id ){
  
  showMsg( "" , author_id + " has entered" , system_avatar);

   var data_json = {
		type: "connected",
		username: user.name 
	};

  client.sendMessage( JSON.stringify( data_json ) );


}

var on_user_disconnected = client.on_user_disconnected  = function( author_id ){
  
  showMsg( "" , author_id + " has left", system_avatar );


   var data_json = {
		type: "disconnected",
		username: user.name 
	};

  	client.sendMessage( JSON.stringify( data_json ) );
}

/* When a message is received, the data it carries is parsed */
var on_message = client.on_message = function( author_id, data ){
	

	var data = JSON.parse(data);
	
	/* If it is of type message, it is shown on window */
	if(data.type === "message"){

		showMsg(data.username +":" , data.content , data.avatar);
	}

	/* If clear is true, the canvas will be cleared*/
	if(data.clear === true){
		
		clearCanvas();
		delete data.clear;
	}	
	
	/* If draw is true, own mouse value is updated with the value of other users' and draws in canvas*/
	if(data.draw === "true"){

		mouse.x=data.x;
		mouse.y=data.y;
		mouse.new_x=data.new_x;
		mouse.new_y=data.new_y;
		mouse.draw=data.draw;
		draw2(data.color);
	}

	/* Updates user list upon someone connecting to room*/
	if(data.type === "connected" ){

		/* TO BE COMPLETED */
		
		//update();
		if(data.type === "connected" ){

		list.push(data.username);

		var userList = document.querySelector(".chatbox__user-list");

		var user = document.querySelector(".chatbox__user--active");

		var aux = user.cloneNode(true);

		aux.querySelector("p").innerHTML = data.username;

		userList.appendChild(aux);
		
	}
		
	}

}

var on_close = client.on_close = function(){
	
};