let players=[];
const winningCombo=[
    [1,2,3],
    [3,6,9],
    [7,8,9],
    [1,4,7],
    [4,5,6],
    [2,5,8],
    [1,5,9],
    [3,5,7],
];
var winner=false;
xTurn=true;
const grid=document.getElementsByClassName('grid')[0];
const playerinfo=document.querySelector('form');
playerinfo.addEventListener('submit',getPlayers);
const replayButton=document.getElementById('replay');
replayButton.addEventListener('click',replay);

//creates modal for player info
const newgame=document.querySelector('#new-game');
const modal=document.getElementsByClassName('modal')[0];
newgame.addEventListener('click',()=>{
     modal.style.display="flex";
 });

function closeStartGame() {
    modal.style.display="none";
}
//gets player info from modal and creates player objects
const getPlayerInfo = () => {
    const player1 = document.getElementById('player1name').value;
    var player2 = document.getElementById('player2name').value;
    if(player2===''){
        player2="Computer";
    }
    const playerOne=Player(player1, marker="O");
    const playerTwo=Player(player2,market='X');
    players.push(playerOne,playerTwo);
    return players;
}

const Player = (name, marker, moves=[]) => {
    this.name=name;
    this.marker = marker;
    this.moves=moves;
  
    function getMarker() {
        return this.marker;
    };

    function getMoves() {
        return this.moves;
    };

    function addMoves(sq){
        this.moves.push(sq);
        return this.moves;
    };

    function clearMoves() {
        moves=[];
        return moves;
    }

    return {name, marker, moves, getMarker, getMoves, addMoves, clearMoves};
  };

function getPlayers(e){
    e.preventDefault();
    const players=getPlayerInfo();
    closeStartGame();
    createPlayerPanels();
    startGameToggle(); 
    return players;
}
 //creates game panels 
function createPlayerPanels() {
    const player1div=document.createElement('div');
    player1div.className="playerInfo";
    const player1header=document.createElement('h2');
    player1header.setAttribute('id','p1');
    player1header.textContent="PLAYER ONE:";
    const player1name=document.createElement('h3');
    player1name.setAttribute('id','nameO');
    const player1marker=document.createElement('h3');
    player1marker.setAttribute('id','markerO');
    player1marker.textContent="O";

    const player1main=document.getElementById('player1');
    player1div.appendChild(player1header);
    player1div.appendChild(player1name);
    player1div.appendChild(player1marker);
    player1main.appendChild(player1div);

    createGrid();

    const player2div=document.createElement('div');
    player2div.className="playerInfo";
    const player2header=document.createElement('h2');
    player2header.setAttribute('id','p2');
    player2header.textContent="PLAYER TWO:";
    const player2name=document.createElement('h3');
    player2name.setAttribute('id','nameX');
    const player2marker=document.createElement('h3');
    player2marker.setAttribute('id','markerX');
    player2marker.textContent="X";

    const player2main=document.getElementById('player2');
    player2div.appendChild(player2header);
    player2div.appendChild(player2name);
    player2div.appendChild(player2marker);
    player2main.appendChild(player2div);

    
    player1name.textContent=players[0]['name'];
    player2name.textContent=players[1]['name'];

    replayButton.style="visibility: visible";
}
//hides start button
function startGameToggle(){
    const startButton=document.getElementsByClassName('startGame')[0]; 
    if(startButton.style.display===""){
        startButton.style.display= "none";
    }
    else if(startButton.style.display==="none"){
        startButton.style.display="";
    }
}
//checks if Player 1 (O) wins
function winOcheck(mark) {
    return winningCombo
    .filter((combination)=>combination.includes(mark))
    .some((possibleCombination) =>
        possibleCombination
    .every((element)=>
        players[0]['moves'].includes(element)
    )
);
};
//checks if Player 2 (X) wins
function winXcheck(mark) {
    return winningCombo
    .filter((combination)=>combination.includes(mark))
    .some((possibleCombination) =>
        possibleCombination
    .every((element)=>
        players[1]['moves'].includes(element)
    )
);
};
//reset game for replay
function replay() {
    clearGrid();
    xTurn=true;
    winner=false;
}
//creates tic tac toe grid and add eventlistener to grid cards     
function createGrid(){
    for(let i=1;i<=9;i++){
        let div=document.createElement('div');
        div.className="card";
        div.setAttribute('id',i);
        grid.appendChild(div);
    }
    if(players[1]['name']==="Computer"){
        playerVAI();
    }
    else{
        twoPlayer();
    }
}

function twoPlayer() {
    const playerTurn=document.getElementById('playerTurn');
    const squares=document.querySelectorAll('.card');
    squares.forEach((square)=>{
        square.addEventListener('click', ()=>{
            var markSquare=parseInt(square.id);
            if((square.textContent==='')&&(xTurn)){
                square.textContent=players[0]['marker'];
                square.style="color: var(--pink)";
                square.classList.add("o");
                players[0].addMoves(markSquare);
                playerTurn.textContent=players[1]['name'] + "'s Turn";
                winOcheck(markSquare);
                if(winOcheck(markSquare)){
                    playerTurn.textContent=players[0]['name'] + " Wins!";
                    winner=true;
                }
                xTurn=!xTurn;
            }
            else if((square.textContent==='')&&(!xTurn)){
                square.textContent=players[1]['marker'];
                square.style="color: var(--blue)";
                square.classList.add("x");
                players[1].addMoves(markSquare);
                playerTurn.textContent=players[0]['name'] + "'s Turn";
                winXcheck(markSquare);  
                if(winXcheck(markSquare)){
                    playerTurn.textContent=players[1]['name'] + " Wins!";
                    winner=true;
                }
                xTurn=!xTurn;
            }
            if(winner===false&&(players[0]['moves'].length+players[1]['moves'].length===9)){
                playerTurn.textContent="Draw! Replay?";
            }
        });
    });
}
//when players choose to replay, grid is cleared as well as players moves
function clearGrid() {
    for(let i=1;i<=9;i++){
        let div=document.getElementById(i);
        div.textContent='';
        div.className="card";
    }
    getPlayerInfo();
    players.shift();
    players.shift();
}

//player vs computer; square is randomly selected from array of empty cards
let freeSquare=[];
let winAI=[];
function playerVAI() {
    const playerTurn=document.getElementById('playerTurn');
    const squares=document.querySelectorAll('.card');
    squares.forEach((square)=>{
        square.addEventListener('click', ()=>{
            var markSquare=parseInt(square.id);
            if(square.textContent===''){
                square.textContent=players[0]['marker'];
                square.style="color: var(--pink)";
                square.classList.add("o");
                players[0].addMoves(markSquare);
                playerTurn.textContent=players[1]['name'] + "'s Turn";
                // winOcheck(markSquare);
                if(winOcheck(markSquare)){
                    playerTurn.textContent=players[0]['name'] + " Wins!";
                    winner=true;
                    return;
                }
                else if(winner===false&&(players[0]['moves'].length+players[1]['moves'].length<9)){
                calculateAImove(squares);
                var winAI=unbeatableAI(markSquare,freeSquare);
                console.log(winAI);
                var random=Math.floor(Math.random() * winAI.length);
                var playSquare=winAI[random];
                console.log(squares[playSquare-1]);
                setTimeout(()=>{
                squares[playSquare-1].textContent=players[1]['marker'];
                squares[playSquare-1].style="color: var(--blue)";
                squares[playSquare-1].classList.add("x");
                players[1].addMoves(playSquare);
                playerTurn.textContent=players[0]['name'] + "'s Turn";
                // winXcheck(playSquare);  
                if(winXcheck(playSquare)){
                    playerTurn.textContent=players[1]['name'] + " Wins!";
                    winner=true;
                }
            },700);
                freeSquare=[];
                winAI=[];
            }
            else if(winner===false&&(players[0]['moves'].length+players[1]['moves'].length===9)){
                playerTurn.textContent="Draw! Replay?";
                return;
            }
        }
    });
    });
}

function calculateAImove(squares) {
    for(let i=0;i<squares.length;i++){
        if(squares[i].textContent===''){
            freeSquare.push(i+1);
        }
    }
    return freeSquare;
}

function unbeatableAI(mark,freeSquare){
    var filterCombo=winningCombo
        .filter((combination)=>combination.includes(mark));
    return filterCombo.reduce((acc,current)=>{
        for(let i=0;i<current.length;i++){
            if(current[i]!==mark){
                acc.push(current[i]);
            }
        }
        return freeSquare.filter(element=>acc.includes(element));
    },[]);
}