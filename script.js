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
{ type: "msg", text: "Thoda nahi... Infact kaafii jyaadaa special hei", side: "left" },
{ type: "msg", text: "Poocho Kyu??", side: "left" },

{ type: "msg", text: "Hmm… kya baat hai aaj 😏", side: "right" },
{ type: "msg", text: "Kyu? 😌", side: "right" },

{ type: "msg", text: "Kyunkiii aaj merii cutie pieee ka bdayy heii !!!", side: "left" },

{ type: "msg", text: "Awwww 😭💖", side: "right" },
{ type: "msg", text: "Tumhe yaad tha??", side: "right" },

{ type: "msg", text: "Obviouslyyy 😏 main itna careless nahi hu", side: "left" },
{ type: "msg", text: "Aur aaj ke liye maine kaafi kuch plan kiya hai", side: "left" },

{ type: "msg", text: "Acchaaa??? 😏", side: "right" },
{ type: "msg", text: "Mujhe thoda darr lag raha hai ab 😭", side: "right" },

{ type: "msg", text: "But pehle ek choti si warning… 😏", side: "left" },
{ type: "msg", text: "Aaj tumhe bohot zyada special feel karwaya jayega", side: "left" },

{ type: "msg", text: "Main ready hoon 😌💅", side: "right" },

{ type: "msg", text: "First things first.. Yeh tere liye banayaa", side: "left" },

{ type: "msg", text: "Sach mein?? 😳", side: "right" },
{ type: "msg", text: "Dikhaaa jaldi", side: "right" },

{ type: "img", src: "https://lh3.googleusercontent.com/d/1tGXn3y0P2pEqkIKp_e2otT3Or6D8ZUVl", side: "left" },

{ type: "msg", text: "Ufff Kitniii pyaari dikhti ho tum…", side: "left" },

{ type: "msg", text: "Stopppp 😭😭", side: "right" },
{ type: "msg", text: "Itni tareef mat karo yaar 😭💖", side: "right" },

{ type: "msg", text: "Waise… ek chhoti si cheez aur 😏", side: "left" },
{ type: "msg", text: "Isko dhyaan se sunna… skip nahi karna 😌🎧", side: "left" },

{ type: "voice", src: "voice1.mp3" },

{ type: "msg", text: "…yeh tumne khud record kiya?? 😭💖", side: "right" },
{ type: "msg", text: "Tum na seriously… 😭", side: "right" },

{ type: "msg", text: "Bas… thoda sa effort 😌💖", side: "left" },

{ type: "msg", text: "Waise ek baat bolu… 😌", side: "left" },

{ type: "msg", text: "Ab kya 😏", side: "right" },

{ type: "msg", text: "Kabhi kabhi tu thodi zyada hi acchi lagti hai 😏", side: "left" },

{ type: "msg", text: "Like this…", side: "left" },
{ type: "img", src: "https://lh3.googleusercontent.com/d/1H_Ktchha-71lEVaJ4-7eq1ZwWaImDYe_", side: "left" },

{ type: "msg", text: "Ye wala toh main hu hi 😌💅", side: "right" },

{ type: "msg", text: "Aur uss waqt na… mere dimaag mein bas ek hi cheez chalti hai 😏🎧", side: "left" },

{ type: "msg", text: "Waittt… kyaa?? 👀", side: "right" },

{ type: "voice", src: "voice2.mp3" },

{ type: "msg", text: "Ab samajh aaya main kya bolna chah rahi thi? 🥺💌", side: "left" },

{ type: "msg", text: "…haan 😭💖", side: "right" },
{ type: "msg", text: "Tu na… alag hi hai 😭", side: "right" },

{ type: "msg", text: "Bas… aaj ke din tum bas khush rehna cutie 💖", side: "left" },

{ type: "msg", text: "Already hoon 😌💖", side: "right" },

{ type: "msg", text: "Aur haan… thodi si yaad mujhe bhi kar lena 😏", side: "left" },

{ type: "msg", text: "Roz karungi 😌💖", side: "right" },

{ type: "msg", text: "Good… warna main khud yaad dilane aa jaungi 😏", side: "left" }

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
function playVoice(item) {
  btn.disabled = true;

  const box = document.createElement("div");
  box.className = "msg left";

  const playBtn = document.createElement("button");
  playBtn.innerText = "Play ▶️";

  const text = document.createElement("p");
  text.innerText = "Sunna dhyaan se 😌🎧";

  box.appendChild(text);
  box.appendChild(playBtn);
  chat.appendChild(box);
  chat.scrollTop = chat.scrollHeight;

  playBtn.onclick = () => {
    music.pause();

    voice.src = item.src;
    voice.currentTime = 0;
    voice.play();

    text.innerText = "Sun rahi hai na…? 😌💖";
    playBtn.style.display = "none";

    voice.onended = () => {
      music.play().catch(()=>{});
      text.innerText = "Bas… ab samajh ja 😌💖";
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
