const chat = document.getElementById("chatBody");
const btn = document.getElementById("nextBtn");
const status = document.getElementById("status");

let step = 0;

// 💬 FLOW (WITH SAMPLE TEXT + IMAGES)
const flow = [

  { type: "msg", text: "Aaj ka din thoda special hai… 😏", side: "left" },

  { type: "msg", text: "Kyu? 😌", side: "right" },

  { type: "msg", text: "Arey patience… sab ek saath thodi batate hai 💖", side: "left" },

  { type: "img", src: "img1.jpg", side: "left" },

  { type: "msg", text: "Waise ek baat bolu… 😌", side: "left" },

  { type: "msg", text: "Kabhi kabhi na… tu thodi zyada hi acchi lagti hai 😏", side: "left" },

  { type: "msg", text: "Matlab… normal se thoda zyada 😌💖", side: "right" },

  { type: "img", src: "img2.jpg", side: "right" },

  { type: "msg", text: "Par ruk… ek cheez sun pehle 😏🎧", side: "left" },

  { type: "voice" },

  { type: "msg", text: "Ab samajh aaya main kya bolna chah raha tha? 🥺💌", side: "left" },

  { type: "msg", text: "Bas… aaj ke din tu bas khush rehna 💖", side: "right" },

  { type: "msg", text: "Aur haan… thodi si yaad mujhe bhi kar lena 😏", side: "left" }

];

btn.onclick = nextMessage;

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

// 🖼️ IMAGE
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
    const audio = document.getElementById("voiceNote");
    audio.play();

    box.innerHTML = "Sun raha hai na…? 😌💖";

    audio.onended = () => {
      box.innerHTML = "Bas… ab samajh ja 😌💖";
      btn.disabled = false;
    };
  };
}
