const chat = document.getElementById("chatBody");
const btn = document.getElementById("nextBtn");
const status = document.getElementById("status");

let step = 0;

// 💌 FLOW
const flow = [
  { type: "msg", text: "TEXT TEXT 😌", side: "left" },
  { type: "msg", text: "TEXT TEXT 😏", side: "right" },
  { type: "msg", text: "Par ruk na… itna easily thodi na mil jayega sab 😏💖", side: "left" },

  { type: "game1" },

  { type: "msg", text: "Dekha 😏 itna bhi easy nahi tha na", side: "left" },

  { type: "game2" },

  { type: "msg", text: "Hmm… thoda impress ho raha hu 😌", side: "right" },

  { type: "game3" },

  { type: "msg", text: "Theek hai… ab tu deserve karta hai aage ka surprise 💖", side: "left" },
  { type: "msg", text: "TEXT TEXT 🥺💌", side: "left" }
];

btn.onclick = nextMessage;

function nextMessage() {
  if (step >= flow.length) return;

  const item = flow[step];

  if (item.type === "msg") typingEffect(item);
  if (item.type === "game1") startMemory();
  if (item.type === "game2") startTic();
  if (item.type === "game3") startSPS();

  step++;
}

// 💬 typing
function typingEffect(item) {
  status.innerText = "typing...";
  btn.disabled = true;

  setTimeout(() => {
    const msg = document.createElement("div");
    msg.className = "msg " + item.side;
    msg.innerText = item.text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    status.innerText = "online";
    btn.disabled = false;
  }, 1000);
}

// ================= 🧠 MEMORY =================
function startMemory() {
  btn.disabled = true;

  const box = document.createElement("div");
  box.className = "game-box";

  const seq = ["🎂","🎉","💖"];

  box.innerHTML = `
    <p>Arey arey… itni jaldi kya hai 😏<br><br>
    Thoda dimag use karte hai pehle… yaad rakhna isse 💭</p>
    <h3>${seq.join(" ")}</h3>
  `;

  chat.appendChild(box);

  setTimeout(() => {
    box.innerHTML = `
      <p>Ab sach sach bata… yaad hai ya bas acting kar raha hai? 😌</p>
    ` + seq.sort(()=>Math.random()-0.5)
      .map(e=>`<span class="choice" onclick="checkMem('${e}')">${e}</span>`).join("");
  }, 2000);

  let i = 0;

  window.checkMem = (e) => {
    if (e === seq[i]) {
      i++;
      if (i === seq.length) {
        box.innerHTML = "Ohooo 😏 itna smart kabse ho gaya? Theek hai… maan liya 💖";
        btn.disabled = false;
      }
    } else {
      box.innerHTML = "Areee 😭 itna bhi yaad nahi raha? Chal phirse try kar… main wait kar raha hu 😌";
      setTimeout(startMemory, 1000);
    }
  };
}

// ================= 🎂 TIC =================
function startTic() {
  btn.disabled = true;

  const box = document.createElement("div");
  box.className = "game-box";

  let board = ["","","","","","","","",""];
  let turn = "🎂";

  box.innerHTML = `
    <p>Chal dekhte hai… strategy hai ya sirf confidence 😏</p>
  ` + board.map((_,i)=>
    `<span class="choice" onclick="move(${i})">⬜</span>`
  ).join("");

  chat.appendChild(box);

  window.move = (i) => {
    if (board[i]) return;
    board[i] = turn;
    box.children[i+1].innerText = turn;

    turn = turn==="🎂"?"🎉":"🎂";

    if (board.every(x=>x)) {
      box.innerHTML = "Hmmm… theek tha 😌 chal aage badhte hai 💖";
      btn.disabled = false;
    }
  };
}

// ================= ✊ SPS =================
function startSPS() {
  btn.disabled = true;

  const box = document.createElement("div");
  box.className = "game-box";

  const arr = ["✊","📄","✂️"];

  box.innerHTML = `
    <p>Last test 😏<br>Dekhte hai luck bhi tera saath deta hai ya nahi</p>
  ` + arr.map(e=>
    `<span class="choice" onclick="play('${e}')">${e}</span>`
  ).join("");

  chat.appendChild(box);

  window.play = (u) => {
    const c = arr[Math.floor(Math.random()*3)];

    if (
      (u==="✊"&&c==="✂️")||
      (u==="📄"&&c==="✊")||
      (u==="✂️"&&c==="📄")
    ) {
      box.innerHTML = "Acha ji 😏 jeet bhi gaya… ab tu deserve karta hai surprise 💖";
      btn.disabled = false;
    } else {
      box.innerHTML = "HAHA 😌 main jeet gaya… chal phirse try kar 😏";
    }
  };
}
