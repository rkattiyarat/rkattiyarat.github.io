//global game parameters:
const side=20
let snakecolor="black"
const defaultcolor="white"//board color- change cells color to white
const applecolor="red"//all of the graphics are done by changing the background color of cells
let snakelist=[[side/2,side/2]]//snake segments, head is new element tail is first element(oldest element)
let apple=[0,0]//apple appear at x=0,y=0 on the board
let snakedir=[0,0]//snake direction when snake is not moving, first start direction
let key=""//Last key pressed goes here
let scores = 0
let scoreEl = document.getElementById('score');
let gamepaused=false;

function addboard(){//generate the board 
	let board=document.getElementById("board");//task 2.1
	for(let y=0;y<side;y++){
		for(let x=0;x<side;x++){
			let cell=document.createElement('div');//create a div element
			cell.id="cell"+x+","+y;// each div has id at x,y position such as <div id="cell 1,1">
			cell.classList.add("cell");//task 2.5
			board.appendChild(cell); //task 2.3
		}
		board.appendChild(document.createElement('br'));//task 2.4
	}
}
function boardcolor(p,c){//change cell at position p to color c
	let lstring="cell"+p[0]+","+p[1];//generate the ID string p[x,y]; p[x]=p[0];p[y]=p[1]
	document.getElementById(lstring).style.backgroundColor=c;//task 2.6
}
function random(side){
	return Math.floor(Math.random() * side);//scale and truncate random number to index one side of the board
}
function iscolidingwith(p) {
	for(let a=0; a<snakelist.length; a++){//for every part of the snake
		if(snakelist[a][0]==p[0]&&snakelist[a][1]==p[1]){//if it's in the same spot as p than it's coliding, i at x == p at x and i at y == p at y
			return true;
		}
	}
	return false;
}

function snakestep(eating,direct){
    let lastX = snakelist[snakelist.length-1][0] //snaklist at the last element[x]
    let lasty = snakelist[snakelist.length-1][1] // snake list at the last element[y]
    lastX=lastX+direct[0];
    lasty=lasty+direct[1];
    if(lastX<0) lastX=side-1;
    if(lastX>=side) lastX=0;
    if(lasty<0) lasty=side-1;
    if(lasty>=side) lasty=0;
    snakelist.push([lastX,lasty]) // add new head to snake when snake is moving with or without eating
    boardcolor(snakelist[snakelist.length-1],snakecolor) // draw snake either eating or not
    if(!eating){// if not eating apple
       boardcolor(snakelist.shift(),defaultcolor) // remove the tail of snake, remove the oldest element of the sanke
    }
    else {
        let p = [] // create empty list for apple location
        do{
            p = [random(side),random(side)]
        }while(iscolidingwith(p))

        scores++
        newapple(p)
    }

}

// function snakestep(eating) {
// 	if(snakedir[0]!=0 || snakedir[1] !=0){//only move the snake if its moving, direction has to be moved so they can't be == 0
// 		let x=snakedir[0]
// 		let y=snakedir[1]
// 		let newx=snakelist[snakelist.length-1][0]+x//Add direction to position x
// 		let newy=snakelist[snakelist.length-1][1]+y//Add direction to position y
// 		snakelist.push([newx,newy])//add new snake head to end of list
//         scores++
// 		boardcolor(snakelist[snakelist.length-1],snakecolor)//draw new head at the end of the list on board using snakecolor from global
			
// 		if(!eating) {//snake stays same length without eating
// 			boardcolor(snakelist.shift(),defaultcolor)//erase oldest part of snake, remove tail, change board color to white
// 		}	
// 		else {//We just ate an apple
// 			let p=[]
// 			do{
// 				p=[random(side),random(side)];
// 			}while(iscolidingwith(p))//generate position vectors until we find one that isn't in the snake
				
// 			newapple(p);//put an apple there
// 		}
// 	}
// }
function selfcolide(){
    let snakePos = snakelist[snakelist.length-1]
	for(let a=0; a<snakelist.length-1; a++){//for every part of the snake
        if(snakelist[a][0]==snakePos[0]&&snakelist[a][1]==snakePos[1]){//if it's in the same spot as p than it's coliding
			return true;
		}
	}
	return false;//if we never returned every part of the snake is in a different spot
}
function newapple(p){//set apple position and draw it on board
	apple=p;
	boardcolor(p,applecolor);
}
function gamestep(){//main game logic step
	//the snake direction is a relative vector with components Y,X
    //set direction based on last key pressed, also make sure we're not reversing direction
    if (key=="KeyW"&&snakedir[1]==0){snakedir=[0,-1]}// up
    if(key=="KeyA"&&snakedir[0]==0){snakedir=[-1,0];}// left
    if(key=="KeyS"&&snakedir[1]==0){snakedir=[0,1];}// down
    if (key=="KeyD"&&snakedir[0]==0){snakedir=[1,0]}// right
    if (key=="KeyP"){gamepaused=!gamepaused;key=""}
    if(!gamepaused){
    	document.getElementById("pi").style.backgroundColor="gray";
	if(!selfcolide()){//game keeps going if we dont die
			
		setTimeout(gamestep,"200");//task 3.7, to keep the game going we register another timeout 200 ms into the future
		let eating=(snakelist[snakelist.length-1][0]==apple[0] && snakelist[snakelist.length-1][1] == apple[1]);
		snakestep(eating,snakedir);
        displayscore();	
	}
	else{
		alert("Game Over! Your Score is: " + (scores));
		end();//if we hit something we end the game
	}  
	}else{
		setTimeout(gamestep,"200");//task 3.7, to keep the game going we register another timeout 200 ms into the future
    	document.getElementById("pi").style.backgroundColor="Cornflowerblue";
	}
}
function displayscore(){
    //score is always the length of the snake-1
    document.getElementById("score").innerHTML="Your Score: "+(scores);//task 2.2
}

function handlekey(keyevent) {//task 3.4
		key=keyevent.code;}
function start(){
	window.addEventListener("keydown", handlekey);//task 3.1
		//set up key event handler
	snakelist=[[side/2,side/2]];//start snake in middle of board
		//task 1.1
	snakedir=[1,0];//relative position, the snake doesn't move
	newapple([random(side),random(side)]);//random location for apple
	document.getElementById("scorewrapper").removeEventListener("click",start);//clean up event listener 
	gamestep("");//gamestep will register a timeout and keep going until the game ends.
}
function clearboard(){
	for(let x=0;x<side;x++){
		for(let y=0;y<side;y++){
    			boardcolor([x,y],defaultcolor);
		}
	}
}

function end(){//set up next game
		//task 3.3
	document.getElementById("scorewrapper").addEventListener("click",start);//listen for user to start game
	document.getElementById("score").innerHTML="Click here to start";//let them know how to start it
	clearboard();//dont leave old game on the board
        scores=0;
}
			
function main() {//onload event handler
	addboard();//set up board
	end();//set up next game
	document.getElementById("colorselector").onchange=setsnakecolor
}



window.addEventListener('beforeunload', function(event){ //task 3.6
   event.preventDefault("Are you sure?");
   event.returnValue="Are you sure?";
   return "Are you sure";
});

function setsnakecolor(e){snakecolor=e.target.value;}
