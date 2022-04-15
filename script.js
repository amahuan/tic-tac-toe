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
//creates modal for book info, modal disappears when it is submitted or when user clicks outside modal
const newgame=document.querySelector('#new-game');
const modal=document.getElementsByClassName('modal')[0];
newgame.addEventListener('click',()=>{
     modal.style.display="flex";
 });

function closeStartGame() {
    modal.style.display="none";
}

const playerinfo=document.querySelector('form');
playerinfo.addEventListener('submit',getPlayers);

const getPlayerInfo = () => {
    const player1 = document.getElementById('player1name').value;
    const player2 = document.getElementById('player2name').value;
    const playerOne=Player(player1, marker="O", moves=[]);
    const playerTwo=Player(player2,market='X', moves=[]);
    players.push(playerOne,playerTwo);
    return players;
}

const Player = (name, marker, moves) => {
    this.name=name;
    this.marker = marker;
    this.moves=moves;
  
    const getMarker = () => {
        return marker;
    };

    const getMoves = () => {
        return moves;
    };

    const addMoves = (sq) => {
        moves.push(sq);
        return moves;
    }

    const clearMoves = () => {
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

    
    player1name.textContent=document.getElementById('player1name').value;
    player2name.textContent=document.getElementById('player2name').value;

    replayButton.style="visibility: visible";
}

let players=[];

function startGameToggle(){
    const startButton=document.getElementsByClassName('startGame')[0]; 
    if(startButton.style.display===""){
        startButton.style.display= "none";
    }
    else if(startButton.style.display==="none"){
        startButton.style.display="";
    }
}

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

const replayButton=document.getElementById('replay');
replayButton.addEventListener('click',replay);
function replay() {
    clearGrid();
    xTurn=true;
    winner=false;
}

function createGrid(){
    for(let i=1;i<=9;i++){
        let div=document.createElement('div');
        div.className="card";
        div.setAttribute('id',i);
        grid.appendChild(div);
    }

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