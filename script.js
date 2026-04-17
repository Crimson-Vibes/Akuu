// ================= LOADING =================
let t = 3;
let timer = setInterval(() => {
  document.getElementById("intro-timer").innerText = t;
  t--;

  if(t < 0){
    clearInterval(timer);
    document.getElementById("loading").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    startGame1();
  }
},1000);

// ================= GAME PROGRESSION =================
let stage = 1;

// ================= GAME 1: RPS =================
function playRPS(user){

  const choices = ["rock","paper","scissors"];
  let bot = choices[Math.floor(Math.random()*3)];

  if(user === bot){
    document.getElementById("rpsResult").innerText = "Tie 😗 try again";
    return;
  }

  let win =
    (user==="rock" && bot==="scissors") ||
    (user==="paper" && bot==="rock") ||
    (user==="scissors" && bot==="paper");

  if(win){
    document.getElementById("rpsResult").innerText = "You win 🎉";
    nextGame();
  } else {
    document.getElementById("rpsResult").innerText = "Computer wins 😏 try again";
  }
}

// ================= GAME 2: TIC TAC TOE =================
let board = Array(9).fill("");

function startGame1(){
  buildBoard();
}

function buildBoard(){
  let b = document.getElementById("board");
  b.innerHTML = "";

  board.forEach((v,i)=>{
    let cell = document.createElement("div");
    cell.className="cell";
    cell.onclick=()=>move(i);
    cell.innerText=v;
    b.appendChild(cell);
  });
}

function move(i){
  if(board[i] !== "") return;

  board[i] = "X";
  buildBoard();

  if(checkWin("X")){
    document.getElementById("tttResult").innerText="You win 💖";
    setTimeout(nextGame,1000);
    return;
  }

  let empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  let bot = empty[Math.floor(Math.random()*empty.length)];
  if(bot !== undefined) board[bot]="O";

  buildBoard();

  if(checkWin("O")){
    board = Array(9).fill("");
    buildBoard();
    document.getElementById("tttResult").innerText="Computer wins 😭 try again";
  }
}

function checkWin(p){
  const win=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8]];
  return win.some(c=>c.every(i=>board[i]===p));
}

// ================= GAME 3: HEART CLICK =================
let score = 0;

function startHeartGame(){
  let area = document.getElementById("heartGame");

  setInterval(()=>{
    let h = document.createElement("div");
    h.className="heart";
    h.innerText="💖";

    h.style.left=Math.random()*90+"%";
    h.style.top="100%";

    h.onclick=()=>{
      score++;
      document.getElementById("heartScore").innerText="Score: "+score;
      h.remove();

      if(score >= 10){
        nextGame();
      }
    };

    area.appendChild(h);

    let fall = setInterval(()=>{
      let top = parseInt(h.style.top);
      if(top < -20){
        h.remove();
        clearInterval(fall);
      } else {
        h.style.top = (top-2)+"%";
      }
    },50);

  },800);
}

// ================= GAME SWITCH =================
function nextGame(){
  stage++;

  document.querySelectorAll(".game").forEach(g=>g.classList.add("hidden"));

  if(stage===2){
    document.getElementById("game2").classList.remove("hidden");
  }

  if(stage===3){
    document.getElementById("game3").classList.remove("hidden");
    startHeartGame();
  }

  if(stage===4){
    document.getElementById("final").classList.remove("hidden");
  }
}
