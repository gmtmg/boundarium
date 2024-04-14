// boundArium.js

const freq = {

  beep : {
    do1: 261.63, re1: 293.66, mi1: 329.63, fa1: 349.23, so1: 392.50, so_ra_1: 417, ra1: 440.00, shi1: 493.88, do2: 523.25
  },
  piano : {
    do1  :"soundSource/do1_piano.mp3",
    re1  :"soundSource/re1_piano.mp3",
    mi1  :"soundSource/mi1_piano.mp3",
    fa1  :"soundSource/fa1_piano.mp3",
    so1  :"soundSource/so1_piano.mp3",
    ra1  :"soundSource/ra1_piano.mp3",
    shi1 :"soundSource/shi1_piano.mp3",
    do2  :"soundSource/do2_piano.mp3",
  }
};


// Canvasの設定
const canvas = document.getElementById('pinballCanvas');
const ctx = canvas.getContext('2d');

const effeCanvasN = document.getElementById('effeCanvas-n');
const ctxefN = effeCanvasN.getContext('2d');

const effeCanvasE = document.getElementById('effeCanvas-e');
const ctxefE = effeCanvasE.getContext('2d');

const effeCanvasS = document.getElementById('effeCanvas-s');
const ctxefS = effeCanvasS.getContext('2d');

const effeCanvasW = document.getElementById('effeCanvas-w');
const ctxefW = effeCanvasW.getContext('2d');

// 正方形の枠線のサイズと位置
const squareSize = 432; // 正方形のサイズ
canvas.width = squareSize;
canvas.height = squareSize;
const squareX = (canvas.width - squareSize) / 2;
const squareY = (canvas.height - squareSize) / 2;

const buttonContainer = document.getElementById('buttonContainer');
const buttonstyle = window.getComputedStyle(buttonContainer);
let roundColor = buttonstyle.getPropertyValue("--main-item-color");

// AudioContextの初期化
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// 簡単なビープ音を鳴らす関数
function playSound(soundType) {
  if(!isNaN(soundType)){
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "square"; // 音の形状
    oscillator.frequency.setValueAtTime(soundType, audioCtx.currentTime); // A4の音（440Hz）
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.11); // 0.1秒後に停止
  }else{
    let source = audioCtx.createBufferSource();
    let request = new XMLHttpRequest();
    request.open('GET', soundType, true);
    request.responseType = 'arraybuffer';
    request.send();
    
    request.onload = function () {
      let res = request.response;
      audioCtx.decodeAudioData(res, function (buf) {
        source.buffer = buf;
      });
    };
    source.connect(audioCtx.destination);
    source.start(0);
  }
}

// ピンボールオブジェクトの配列を定義
// 232 : 8
// 296 : 4
// squareSize - vx = size
//サイズの定義  squareSize - (squareSize - size / x )
let pinballs = [
  {
    id:0,
    x: 0 ,
    y: -4 ,
    size: 48,
    vx: 4, // X方向の速度
    vy: 4, // Y方向の速度
    soundTop: freq.piano.do1,
    soundRight: freq.piano.fa1,
    soundBottom: freq.piano.do2,
    soundLeft: freq.piano.so1,
    color: "orange",
    radiusNum: 5
  },  {
    id:0,
    x: 1 ,
    y: -3 ,
    size: 48,
    vx: 4, // X方向の速度
    vy: 4, // Y方向の速度
    soundTop: freq.piano.re1,
    soundRight: freq.piano.mi1,
    soundBottom: freq.piano.shi1,
    soundLeft: freq.piano.ra1,
    color: "red",
    radiusNum: 5
  },  {
    id:0,
    x: 2 ,
    y: -2 ,
    size: 48,
    vx: 4, // X方向の速度
    vy: 4, // Y方向の速度
    soundTop: freq.piano.mi1,
    soundRight: freq.piano.re1,
    soundBottom: freq.piano.ra1,
    soundLeft: freq.piano.shi1,
    color: "green",
    radiusNum: 5
  },  {
    id:0,
    x: 3 ,
    y: -1 ,
    size: 48,
    vx: 4, // X方向の速度
    vy: 4, // Y方向の速度
    soundTop: freq.piano.fa1,
    soundRight: freq.piano.do1,
    soundBottom: freq.piano.so1,
    soundLeft: freq.piano.do2,
    color: "blue",
    radiusNum: 5
  }
];

const set_pinballs = pinballs;

// sizeとvの値から初期位置を再設定
function ballPosition(xy, size) {
  dist = (squareSize - size) / 8;
  //console.log(dist);
  xy = size / 2 + dist*(xy + 4) ;
  return xy;
}

pinballs.forEach(ball => {
  if (ball.x == -4 && ball.vx > 0) ball.vx *= -1;
  if (ball.x == 4 && ball.vx < 0) ball.vx *= -1;
  ball.x = ballPosition(ball.x, ball.size);
  if (ball.y == -4 && ball.vy > 0) ball.vy *= -1;
  if (ball.y == 4 && ball.vy < 0) ball.vy *= -1;
  ball.y = ballPosition(ball.y, ball.size);
});


function drawRoundedSquare(ctx, x, y, size, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + size - radius, y);
  ctx.quadraticCurveTo(x + size, y, x + size, y + radius);
  ctx.lineTo(x + size, y + size - radius);
  ctx.quadraticCurveTo(x + size, y + size, x + size - radius, y + size);
  ctx.lineTo(x + radius, y + size);
  ctx.quadraticCurveTo(x, y + size, x, y + size - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  
  // 線の設定
  ctx.strokeStyle = roundColor; // 線の色
  ctx.lineWidth = 2; // 線の太さ、0ではなく適切な値に
  ctx.stroke(); // 線を描画
}

// 正方形の枠線を描画
function drawSquare() {
  ctx.strokeStyle = roundColor; // 線の色
  drawRoundedSquare(ctx, squareX, squareY, squareSize, 10);
}

// ピンボールの描画と更新

  // 角丸の四角形を描く関数
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function slideAndFade(colorS, xS, speedS, cvs, con) {
  let speed = speedS * 4;
  let opacity = 1.0;
  let color = colorS; 
  function draw() {
    cvs.clearRect(0, 0, con.width, con.height);
    cvs.fillStyle = color; // カラーコードを使用
    cvs.fillRect(xS, 0, 10, con.height);
    xS -= speed;
    opacity -= 0.1;
    cvs.globalAlpha = opacity; // 透明度を設定
    if (xS > -10) {
        requestAnimationFrame(draw);
    }
  }
draw();
}

function slideAndFadeHorizontal(colorS, yS, speedS, cvs, con) {
  let speed = speedS * 2;
  let opacity = 1.0;
  let color = colorS; 
    
  function draw() {
    cvs.clearRect(0, 0, con.width, con.height);
    cvs.fillStyle = color; // カラーコードを使用
    cvs.fillRect(0, yS,  con.width, 5);
    yS -= speed; // 上に移動するため、y座標を減算する
    opacity -= 0.1;
    cvs.globalAlpha = opacity; // 透明度を設定
    
    if (yS > -10) { // 上端に達するまで繰り返す
        requestAnimationFrame(draw);
    }
  }
  draw();
}


function updatePinballs() {
  pinballs.forEach(pinball => {
    // ピンボールを描画
    // 右か左の壁に当たった場合
    if (pinball.x <= squareX + pinball.size / 2 ){
      pinball.vx *= -1; // X方向の速度の符号を反転
      playSound(pinball.soundLeft);
      // ここにエフェクトの関数を作りたい
      slideAndFade(pinball.color, 280, pinball.vx, ctxefW, effeCanvasW);

    }
    if (pinball.x >= squareX + squareSize - pinball.size / 2){
      pinball.vx *= -1; // X方向の速度の符号を反転
      playSound(pinball.soundRight);
      slideAndFade(pinball.color, 0, pinball.vx, ctxefE, effeCanvasE); 
    }
    // 上か下の壁に当たった場合
    if (pinball.y <= squareY + pinball.size / 2){
      pinball.vy *= -1; // Y方向の速度の符号を反転
      playSound(pinball.soundTop);
      slideAndFadeHorizontal(pinball.color, 140, pinball.vy, ctxefN, effeCanvasN); 
    }
    if (pinball.y >= squareY + squareSize - pinball.size / 2){
      pinball.vy *= -1; // Y方向の速度の符号を反転
      playSound(pinball.soundBottom);
      slideAndFadeHorizontal(pinball.color, 0, pinball.vy, ctxefS, effeCanvasS); 
    }
    
    pinball.x += pinball.vx;
    pinball.y += pinball.vy;

  // この関数を使って、角が丸い四角形を描く
  ctx.fillStyle = pinball.color;
  drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum); // ここでの10は角の丸みの半径
  });
}

let isPlaying = false; 
let editFlag = true; 
let pianoFlag = false;
const playButton = document.getElementById('togglePlayButton'); 
const editButton = document.getElementById('editButton')
const resetButton = document.getElementById('resetButton')

const editContainer = document.getElementById('editContainer');
const editCanvas = document.getElementById('editCanvas');
const editCtx = editCanvas.getContext('2d');
const pianotile = document.getElementById('pianotile');
const pianotileContainer = document.getElementById('pianotileContainer');
let editNum = -1;

function playSwith(){
  isPlaying = !isPlaying; // 再生状態を切り替える
  const icon = playButton.querySelector('i');
  if (isPlaying && editFlag) {
    icon.className = 'fas fa-pause'; // 停止アイコンに変更
    playButton.classList.add('playing');
    animate(); // アニメーションを開始する
  } else {
    icon.className = 'fas fa-play'; // 再生アイコンに変更
    playButton.classList.remove('playing'); 
  }
}

editCanvas.addEventListener('click', function(e) {
  if (editNum == -1) return;
  const rectEdit = editCanvas.getBoundingClientRect();
  const xEdit = e.clientX - rectEdit.left; // クリックされたX座標
  const yEdit = e.clientY - rectEdit.top; // クリックされたY座標
  if (xEdit >= editCanvas.width / 2 - pinballs[editNum].size / 2 && xEdit <= editCanvas.width / 2 + pinballs[editNum].size / 2 &&
      yEdit >= editCanvas.height / 2 - pinballs[editNum].size / 2 && yEdit <= editCanvas.height / 2 + pinballs[editNum].size / 2) {
    // ここで、ピンボールがクリックされたときのアクションを実行
    console.log('Edit Pinball clicked!', pinballs[editNum]);
  }
});

function createButton(pinball) {
  if(editFlag) return;
  editNum = pinball.id
  editCtx.clearRect(0, 0, editCanvas.width, editCanvas.height);
  editCtx.fillStyle = pinball.color;
  drawRoundedRect(editCtx, editCanvas.width / 2 - pinball.size / 2, editCanvas.height / 2 - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum);
  }

canvas.addEventListener('click', function(e) {
  if(editFlag) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left; // クリックされたX座標
  const y = e.clientY - rect.top; // クリックされたY座標
  // すべてのpinballsをループして、クリックされた位置がピンボール内かどうかをチェック
  pinballs.forEach(pinball => {
    if (x >= pinball.x - pinball.size / 2 && x <= pinball.x + pinball.size / 2 &&
        y >= pinball.y - pinball.size / 2 && y <= pinball.y + pinball.size / 2) {
      // ここで、ピンボールがクリックされたときのアクションを実行
      console.log('Pinball clicked!', pinball);

      createButton(pinball);
    }
  });
});

// ピンボールのアニメーションの再生状態を保持する変数
// ボタンのイベントリスナーを設定
playButton.addEventListener('click', function() {
  if(!editFlag) return;
  playSwith();
});

editButton.addEventListener('click', function() {
  editFlag = !editFlag;
  canvas.style.transition = 'transform 1.0s ease';
  editContainer.style.transition = 'transform 1s, opacity 0.5s';
  if(!editFlag){
    playSwith();

    editButton.classList.add('playing');
    canvas.style.transform = 'translateX(216px)';
    editContainer.style.opacity = '1'; // 最終的に透明にする
    editContainer.style.transform = 'translateX(-236px)'; // 左に240px移動させる
    
  }else{
    playSwith();
    canvas.style.transform = 'translateX(0px)';
    editContainer.style.opacity = '0'; // だんだん見えるように
    editContainer.style.transform = 'translateX(0px)';
    editButton.classList.remove('playing'); 
  }
});

pianotile.addEventListener('click', function() {
  if(!pianoFlag){
    pianotileContainer.style.opacity = "1";
    pianoFlag = true;
  }else{
    pianotileContainer.style.opacity = "0";
    pianoFlag = false;
  }
  
  
});





// アニメーションループ
function animate() {
  if (!isPlaying) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
  drawSquare(); // 枠線を再描画
  
  updatePinballs(); // ピンボールを更新
  requestAnimationFrame(animate); // 次のフレームを要求
}

drawSquare();
pinballs.forEach(pinball => {
  ctx.fillStyle = pinball.color;
  drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum); // ここでの10は角の丸みの半径
});

animate();


