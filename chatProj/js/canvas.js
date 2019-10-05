
//inicialize variables
var mouse = { x:0, y:0, new_x:0, new_x:0 , draw:"true", color: "black"};

canvas = document.getElementById('myCanvas');

ctx =  canvas.getContext("2d");

//clear button 
var clear = document.querySelector("#clear").addEventListener("click",onClear);

//events for colors 
var red = document.querySelector(".red").addEventListener("click", function(event) {

mouse.color = "red";

});

var green = document.querySelector(".green").addEventListener("click", function(event) {

mouse.color = "green";

});
    
var blue = document.querySelector(".blue").addEventListener("click", function(event) {

 mouse.color = "blue";

});
    
var black = document.querySelector(".black").addEventListener("click", function(event) {

mouse.color = "black";

});
    
 canvas.addEventListener('mousemove', function(e) {
        mouse.x = mouse.new_x;
        mouse.y = mouse.new_y;
        mouse.new_x = e.pageX - this.offsetLeft;
        mouse.new_y = e.pageY - this.offsetTop;
		
       	if (mouse.draw==="true") 
		client.sendMessage( JSON.stringify(mouse) );
	
    }, false);


//start listening mousemove when mousdown
canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', draw, false);
        mouse.draw="true";
		
    }, false);


//stop listening mousemove when mousdown
canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', draw, false);
        mouse.draw="false";
  
    }, false);


function draw() {

		if (mouse.draw ==="true"){
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(mouse.new_x, mouse.new_y);
        ctx.strokeStyle = mouse.color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
    	}
    }

function draw2(color) {

        if (mouse.draw ==="true"){
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(mouse.new_x, mouse.new_y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        }
    }
	
function onClear(){
	
	var data_json = {
		clear: true
	};
		
	client.sendMessage( JSON.stringify(data_json));
	clearCanvas();
}

function clearCanvas(){

	ctx.clearRect(0, 0, canvas.width, canvas.width);

}