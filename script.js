const chat = document.getElementById("chatBody");
const btn = document.getElementById("nextBtn");
const status = document.getElementById("status");
const voice = document.getElementById("voiceNote");
const music = document.getElementById("bgMusic");

const heartContainer = document.getElementById("hearts");
const balloonArea = document.getElementById("balloons");

let step = 0;
let animationStarted = false;

const flow = [
  { type: "msg", text: "Aaj ka din thoda special hai… 😏", side: "left" },
  { type: "msg", text: "Haan bolo na 😌", side: "right" },
  { type: "msg", text: "Kyunki aaj tumhara din hai 💖", side: "left" },

  { type: "msg", text: "Sach mein?? 😭💖", side: "right" },
  { type: "img", src: "https://lh3.googleusercontent.com/d/1tGXn3y0P2pEqkIKp_e2otT3Or6D8ZUVl", side: "left" },

  { type: "voice", src: "voice.mp3" },

  { type: "msg", text: "Tum special ho 😌💖", side: "left" },
  { type: "msg", text: "Aww 😭💖", side: "right" }
];

btn.onclick = () => {
  if (step === 0) {
    music.volume = 0.3;
    music.play().catch(()=>{});
    startEffects();
  }
  next();
};

function next() {
  if (step >= flow.length) {
    btn.innerText = "Replay 🔁";
    btn.onclick = () => location.reload();
    return;
  }

  const item = flow[step];

  if (item.type === "msg") showTypingMessage(item);
  if (item.type === "img") showImage(item);
  if (item.type === "voice") showVoice(item);

  step++;
}

function showTypingMessage(item) {
  btn.disabled = true;

  const typing = document.createElement("div");
  typing.className = "msg left typing";
  typing.innerHTML = "<span></span><span></span><span></span>";
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    typing.remove();

    const msg = document.createElement("div");
    msg.className = "msg " + item.side;
    msg.innerText = item.text;

    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;

    btn.disabled = false;
  }, 1200);
}

function showImage(item) {
  const msg = document.createElement("div");
  msg.className = "msg " + item.side;
  msg.innerHTML = `<img src="${item.src}">`;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function showVoice(item) {
  btn.disabled = true;

  const box = document.createElement("div");
  box.className = "msg left";

  const btnPlay = document.createElement("button");
  btnPlay.innerText = "Play ▶️";

  box.innerText = "Sunna dhyaan se 😌🎧";
  box.appendChild(document.createElement("br"));
  box.appendChild(btnPlay);

  chat.appendChild(box);

  btnPlay.onclick = () => {
    music.pause();
    voice.src = item.src;
    voice.play();

    btnPlay.style.display = "none";
    box.innerText = "Sun rahi ho na… 😌💖";

    voice.onended = () => {
      music.play().catch(()=>{});
      box.innerText = "Bas… samajh ja 😌💖";
      btn.disabled = false;
    };
  };
}

function startEffects() {
  if (animationStarted) return;
  animationStarted = true;

  setInterval(() => {
    const h = document.createElement("span");
    h.innerText = "💖";
    h.style.left = Math.random()*100 + "vw";
    h.style.fontSize = "18px";
    heartContainer.appendChild(h);
    setTimeout(()=>h.remove(),7000);

    const b = document.createElement("span");
    b.innerText = "🎈";
    b.style.left = Math.random()*100 + "vw";
    balloonArea.appendChild(b);
    setTimeout(()=>b.remove(),10000);

  }, 500);
}
