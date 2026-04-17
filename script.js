const chat = document.getElementById("chatBody");
const btn = document.getElementById("nextBtn");
const status = document.getElementById("status");
const voice = document.getElementById("voiceNote");
const music = document.getElementById("bgMusic");

const heartContainer = document.getElementById("hearts");
const balloonArea = document.getElementById("balloons");

let step = 0;

// 💬 FLOW
const flow = [
  { type: "msg", text: "Aaj ka din thoda special hai… 😏", side: "left" },
  { type: "msg", text: "Kyu? 😌", side: "right" },

  { type: "msg", text: "Arey patience… sab ek saath thodi batate hai 💖", side: "left" },

  { type: "msg", text: "Ye dekh… bilkul tu 😭💖", side: "left" },
  { type: "img", src: "https://lh3.googleusercontent.com/d/YOUR_FILE_ID", side: "left" },

  { type: "msg", text: "Waise ek baat bolu… 😌", side: "left" },
  { type: "msg", text: "Kabhi kabhi tu thodi zyada hi acchi lagti hai 😏", side: "left" },

  { type: "msg", text: "Par ruk… ek cheez sun pehle 😏🎧", side: "left" },

  { type: "voice" },

  { type: "msg", text: "Ab samajh aaya main kya bolna chah raha tha? 🥺💌", side: "left" },
  { type: "msg", text: "Bas… aaj ke din tu bas khush rehna 💖", side: "right" },

  { type: "msg", text: "Aur haan… thodi si yaad mujhe bhi kar lena 😏", side: "left" }
];

// 🎵 BUTTON CLICK
btn.onclick = () => {
  if (step === 0) {
    music.volume = 0.3;
    music.play().catch(()=>{});
    startHeartsAndBalloons();
  }
  nextMessage();
};

function nextMessage() {
  if (step >= flow.length) return;

  const item = flow[step];

  if (item.type === "msg") showMessage(item);
  if (item.type === "img") showImage(item);
  if (item.type === "voice") playVoice();

  step++;
}

// 💬 TEXT
function showMessage(item) {
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
  }, 1200);
}

// 🖼️ GIF
function showImage(item) {
  const msg = document.createElement("div");
  msg.className = "msg " + item.side;

  msg.innerHTML = `<img src="${item.src}">`;

  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

// 🎧 VOICE
function playVoice() {
  btn.disabled = true;

  const box = document.createElement("div");
  box.className = "msg left";

  box.innerHTML = `
    <p>Ruk… isko dhyaan se sunna 😌🎧<br><br>
    Skip mat karna… warna bura maan jaunga 😏</p>
    <button onclick="startVoice()">Play ▶️</button>
  `;

  chat.appendChild(box);

  window.startVoice = () => {
    music.pause();
    voice.play();

    box.innerHTML = "Sun raha hai na…? 😌💖";

    voice.onended = () => {
      music.play().catch(()=>{});
      box.innerHTML = "Bas… ab samajh ja 😌💖";
      btn.disabled = false;
    };
  };
}

// 💖 HEARTS & 🎈 BALLOONS
function startHeartsAndBalloons() {
  setInterval(() => {

    const heart = document.createElement('span');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 10 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);

    const b = document.createElement('span');
    b.textContent = '🎈';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.fontSize = Math.random() * 30 + 30 + 'px';
    balloonArea.appendChild(b);
    setTimeout(() => b.remove(), 13000);

  }, 600);
}
