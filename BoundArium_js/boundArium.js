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
  },
  darkpiano : {
    do1  :"soundSource/do1_darkpiano.mp3",
    re1  :"soundSource/re1_darkpiano.mp3",
    mi1  :"soundSource/mi1_darkpiano.mp3",
    fa1  :"soundSource/fa1_darkpiano.mp3",
    so1  :"soundSource/so1_darkpiano.mp3",
    ra1  :"soundSource/ra1_darkpiano.mp3",
    shi1 :"soundSource/shi1_darkpiano.mp3",
    do2  :"soundSource/do2_darkpiano.mp3",
  },
  
  novelClav : {
    do1  :"soundSource/do1_novelClav.mp3",
    re1  :"soundSource/re1_novelClav.mp3",
    mi1  :"soundSource/mi1_novelClav.mp3",
    fa1  :"soundSource/fa1_novelClav.mp3",
    so1  :"soundSource/so1_novelClav.mp3",
    ra1  :"soundSource/ra1_novelClav.mp3",
    shi1 :"soundSource/shi1_novelClav.mp3",
    do2  :"soundSource/do2_novelClav.mp3",
  },
  vibp : {
    do1  :"soundSource/do1_vibp.mp3",
    re1  :"soundSource/re1_vibp.mp3",
    mi1  :"soundSource/mi1_vibp.mp3",
    fa1  :"soundSource/fa1_vibp.mp3",
    so1  :"soundSource/so1_vibp.mp3",
    ra1  :"soundSource/ra1_vibp.mp3",
    shi1 :"soundSource/shi1_vibp.mp3",
    do2  :"soundSource/do2_vibp.mp3",
  },
  drum : {
    do1  :"soundSource/drum.mp3",
    re1  :"soundSource/drum.mp3",
    mi1  :"soundSource/drum.mp3",
    fa1  :"soundSource/drum2.mp3",
    so1  :"soundSource/drum2.mp3",
    ra1  :"soundSource/drum2.mp3",
    shi1 :"soundSource/drum3.mp3",
    do2  :"soundSource/drum3.mp3",
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

const buttonContainer = document.querySelectorAll('#buttonContainer button');
const canvasStyle = window.getComputedStyle(canvas);
let canvasColor = canvasStyle.getPropertyValue("--main-item-color");
const shadowOffLen = squareSize / 4
function generateColorScheme() {
  // ベースとなる色相（hue）をランダムに生成
  var baseHue = Math.random() * 360;
  // 彩度（saturation）を一定に設定
  var saturation = 70;
  // 明度（lightness）を一定に設定
  var lightness = Math.random() > 0.5 ? 99 : 10; // 明度を限りなく白または黒に設定
  let mNum = -1
  if (lightness<=10){mNum = 1}
  // ベースの色を基準にした配色パターンを生成
  var colorScheme = [
      'hsl(' + baseHue + ', ' + saturation + '%, ' + (lightness + 3) + '%)',
      'hsl(' + baseHue + ', ' + saturation + '%, ' + (lightness - 1) + '%)', // やや暗めの色
      'hsl(' + (baseHue  + 10*mNum) + ', ' + (saturation+20*mNum) + '%, ' + (lightness + 80*mNum) + '%)',
    
      'hsl(' + (baseHue  + 45*mNum) + ', ' + (saturation+20*mNum) + '%, ' + (lightness + 50*mNum) + '%)', // やや明るめの色
      'hsl(' + (baseHue  + 15*mNum) + ', ' + (saturation+40*mNum) + '%, ' + (lightness + 80*mNum) + '%)',
      'hsl(' + (baseHue  + 10*mNum) + ', ' + (saturation+15*mNum) + '%, ' + (lightness + 30*mNum) + '%)',
      'hsl(' + (baseHue  + 60*mNum) + ', ' + (saturation+30*mNum) + '%, ' + (lightness + 60*mNum) + '%)',
      'hsl(' + (baseHue  + 90*mNum) + ', ' + (saturation+10*mNum) + '%, ' + (lightness + 25*mNum) + '%)',
      'hsl(' + (baseHue  + 80*mNum) + ', ' + (saturation+30*mNum) + '%, ' + (lightness + 100*mNum) + '%)',
  ];

  return colorScheme;
}
function randomPos() {
  return Math.floor(Math.random() * (9)) -4;
}
function getRandomNonZero() {
  let num = 0;
  while (num === 0) {
    num = Math.floor(Math.random() * 9) - 4;
  }
  return num;
}
function randomfreq() {
  return Math.floor(Math.random() * (8));
}
colorList = generateColorScheme()
document.body.style.backgroundColor = colorList[0];
canvas.style.backgroundColor = colorList[1];
buttonContainer.forEach(function(button) {
  button.style.backgroundColor = colorList[0]; // ボタンの背景色を変更
  button.style.color = colorList[2]; // ボタンの色を変更
});
// RGBからHSVへの変換関数
function rgbToHsv(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max === 0 ? 0 : d / max;

  if (max === min) {
      h = 0; // achromatic
  } else {
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
  }
  return [h, s, v];
}

// HSVからRGBへの変換関数
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// 指定した色が明るい場合に彩度を高め、明度を低くし、
// 指定した色が暗い場合に彩度を下げて明度を高くする関数
function adjustColorBrightness(color) {
  var r = parseInt(color.slice(1, 3), 16);
  var g = parseInt(color.slice(3, 5), 16);
  var b = parseInt(color.slice(5, 7), 16);

  var hsv = rgbToHsv(r, g, b);
  var h = hsv[0], s = hsv[1], v = hsv[2];
 console.log(v);
  if (v > 0.5) {
      s *= 1.5; // 彩度を高める
      v *= 0.7; // 明度を低くする
  } else {
    // 白色から少しだけ指定した色に近い色を生成
    v = 0.1; // 明度を最大値に設定
    s = 0.1; 
}

  var rgb = hsvToRgb(h, s, v);

  // 新しい色の16進数表現を返す
  return "#" + rgb.map(c => {
      var hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
  }).join("");
}


var adjustedColor = adjustColorBrightness(canvasColor);


// AudioContextの初期化
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// 簡単なビープ音を鳴らす関数
function playSound(soundType, gainN) {
  gainN = gainN / 8;
  if (gainN >= 1){
    gainN = 1;
  }
  if(!isNaN(soundType)){
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    // 音量の設定 (1.0が標準の音量)
    console.log(Math.abs(gainN));
    gainNode.gain.value = Math.abs(gainN);
    oscillator.type = "square"; // 音の形状
    oscillator.frequency.setValueAtTime(soundType, audioCtx.currentTime); // A4の音（440Hz）
    oscillator.connect(audioCtx.destination);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.11); // 0.1秒後に停止
  }else{
    let source = audioCtx.createBufferSource();
    const gainNode = audioCtx.createGain();
    // 音量の設定 (1.0が標準の音量)

    console.log(Math.abs(gainN));
    gainNode.gain.value = Math.abs(gainN);
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
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    source.start(0);
  }
}

// ピンボールオブジェクトの配列を定義
// 232 : 8
// 296 : 4
// squareSize - vx = size
//サイズの定義  squareSize - (squareSize - size / x )
let pinballs = [];
let pinballLength = Math.floor(Math.random() * 5) + 1;
for (let i = 0; i < pinballLength; i++) {
  pinballs.push(
    {
      id:i,
      x: randomPos(),
      y: randomPos(),
      size: 48,
      vx: randomPos(), // X方向の速度
      vy: randomPos(), // Y方向の速度
      soundTop: Object.values(freq.piano)[randomfreq()],
      soundRight: Object.values(freq.piano)[randomfreq()],
      soundBottom: Object.values(freq.piano)[randomfreq()],
      soundLeft: Object.values(freq.piano)[randomfreq()],
      color: colorList[i+3],
      radiusNum: 5
    }
  )
}



// sizeとvの値から初期位置を再設定
function ballPosition(xy, size) {
  dist = (squareSize - size) / 8;
  //console.log(dist);
  xy = size / 2 + dist*(xy + 4) ;
  return xy;
}

pinballs.forEach(ball => {
  if (ball.x == 4 || ball.x == -4)ball.vx = getRandomNonZero();
  if (ball.x == -4 && ball.vx > 0) ball.vx *= -1;
  if (ball.x == 4 && ball.vx < 0) ball.vx *= -1;
  ball.x = ballPosition(ball.x, ball.size);
  if (ball.y == 4 || ball.y == -4)ball.vy = getRandomNonZero();
  if (ball.y == -4 && ball.vy > 0) ball.vy *= -1;
  if (ball.y == 4 && ball.vy < 0) ball.vy *= -1;
  ball.y = ballPosition(ball.y, ball.size);
  
});

const setPinballs = JSON.parse(JSON.stringify(pinballs));
const rectPinball = JSON.parse(JSON.stringify(pinballs));
let prerectPinball = JSON.parse(JSON.stringify(rectPinball));
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
  //ctx.strokeStyle = roundColor; // 線の色
  //ctx.lineWidth = 2; // 線の太さ、0ではなく適切な値に
  //ctx.stroke(); // 線を描画
}

// 正方形の枠線を描画
function drawSquare() {
  //ctx.strokeStyle = roundColor; // 線の色
  drawRoundedSquare(ctx, squareX, squareY, squareSize, 10);
}

// ピンボールの描画と更新

  // 角丸の四角形を描く関数
function drawRoundedRect(ctx, x, y, width, height, radius, styleStr) {
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
  if(styleStr == "fill") {
    ctx.fill()
  } else{
  ctx.strokeStyle = colorList[2];
  ctx.setLineDash([5, 5]); // 5ピクセル描画して15ピクセル空ける
  ctx.stroke();
  }
}

function slideAndFade(colorS, xS, speedS, cvs, con) {
  let speed = speedS * 4;
  let opacity = 1.0;
  let color = colorS; 
  function draw() {
    cvs.clearRect(0, 0, con.width, con.height);
    cvs.fillStyle = color; // カラーコードを使用
    cvs.fillRect(xS, 0, 14, con.height);
    xS -= speed;
    opacity -= 0.11;
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
    cvs.fillRect(0, yS,  con.width, 4);
    yS -= speed; // 上に移動するため、y座標を減算する
    opacity -= 0.05;
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
      playSound(pinball.soundLeft, pinball.vx);
      slideAndFade(pinball.color, 280, pinball.vx, ctxefW, effeCanvasW);

    }
    if (pinball.x >= squareX + squareSize - pinball.size / 2){
      pinball.vx *= -1; // X方向の速度の符号を反転
      playSound(pinball.soundRight, pinball.vx);
      slideAndFade(pinball.color, 0, pinball.vx, ctxefE, effeCanvasE); 
    }
    // 上か下の壁に当たった場合
    if (pinball.y <= squareY + pinball.size / 2){
      pinball.vy *= -1; // Y方向の速度の符号を反転
      playSound(pinball.soundTop, pinball.vy);
      slideAndFadeHorizontal(pinball.color, 140, pinball.vy, ctxefN, effeCanvasN); 
    }
    if (pinball.y >= squareY + squareSize - pinball.size / 2){
      pinball.vy *= -1; // Y方向の速度の符号を反転
      playSound(pinball.soundBottom, pinball.vy);
      slideAndFadeHorizontal(pinball.color, 0, pinball.vy, ctxefS, effeCanvasS);
    }
    
    pinball.x += pinball.vx;
    pinball.y += pinball.vy;

  // この関数を使って、角が丸い四角形を描く
  ctx.fillStyle = pinball.color;
  ctx.shadowOffsetX = -(pinball.x - squareSize / 2) / shadowOffLen; // 影のX方向のオフセット
  ctx.shadowOffsetY = -(pinball.y - squareSize / 2) / shadowOffLen; // 影のY方向のオフセット

  ctx.shadowBlur = 2; // 影のぼかし量
  //ctx.shadowColor = adjustedColor; // 影の色
  drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "fill"); // ここでの10は角の丸みの半径
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
//const editCtx = editCanvas.getContext('2d');
const pianotile = document.getElementById('pianotile');
const pianotileContainer = document.getElementById('pianotileContainer');
let editNum = -1;

function playSwith(){
  isPlaying = !isPlaying; // 再生状態を切り替える
  //const icon = playButton.querySelector('i');
  //if (isPlaying && editFlag) {
    //icon.className = 'fas fa-pause'; // 停止アイコンに変更
    //playButton.classList.add('playing');
    if (isPlaying)  {
      animate(); // アニメーションを開始する
      
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ballRectSet(setPinballs, 1);
      pinballs = JSON.parse(JSON.stringify(setPinballs));
      //icon.className = 'fas fa-play'; // 再生アイコンに変更
      //playButton.classList.remove('playing'); 
    }
}

//editCanvas.addEventListener('click', function(e) {
//  if (editNum == -1) return;
//  const rectEdit = editCanvas.getBoundingClientRect();
//  const xEdit = e.clientX - rectEdit.left; // クリックされたX座標
//  const yEdit = e.clientY - rectEdit.top; // クリックされたY座標
//  if (xEdit >= editCanvas.width / 2 - pinballs[editNum].size / 2 && xEdit <= editCanvas.width / 2 + pinballs[editNum].size / 2 &&
//      yEdit >= editCanvas.height / 2 - pinballs[editNum].size / 2 && yEdit <= editCanvas.height / 2 + pinballs[editNum].size / 2) {
//    // ここで、ピンボールがクリックされたときのアクションを実行
//    console.log('Edit Pinball clicked!', pinballs[editNum]);
//  }
//});

//function createButton(pinball) {
//  if(editFlag) return;
//  editNum = pinball.id
//  editCtx.clearRect(0, 0, editCanvas.width, editCanvas.height);
//  editCtx.fillStyle = pinball.color;
//  drawRoundedRect(editCtx, editCanvas.width / 2 - pinball.size / 2, editCanvas.height / 2 - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "fill");
//  }

//canvas.addEventListener('click', function(e) {
//  if(editFlag) return;
//  const rect = canvas.getBoundingClientRect();
//  const x = e.clientX - rect.left; // クリックされたX座標
//  const y = e.clientY - rect.top; // クリックされたY座標
// すべてのpinballsをループして、クリックされた位置がピンボール内かどうかをチェック
//  pinballs.forEach(pinball => {
//    if (x >= pinball.x - pinball.size / 2 && x <= pinball.x + pinball.size / 2 &&
//        y >= pinball.y - pinball.size / 2 && y <= pinball.y + pinball.size / 2) {
//      // ここで、ピンボールがクリックされたときのアクションを実行
//      console.log('Pinball clicked!', pinball);
//      createButton(pinball);
//    }
//  });
//});

// ピンボールのアニメーションの再生状態を保持する変数
// ボタンのイベントリスナーを設定
//playButton.addEventListener('click', function() {
//  if(!editFlag) return;
//  playSwith();
//});

const editSquareContainer = document.getElementById('editSquareContainer'); 
let edittingNum = 0;

 /* 
editButton.addEventListener('click', function() {
  editFlag = !editFlag;
  if(!editFlag){
    editSquareContainer.innerHTML = '';
    playSwith();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballRectSet(setPinballs, 0.3);
    pinballs = JSON.parse(JSON.stringify(setPinballs));
    allBln = true;
    changeBln = false;
    prerectPinball = JSON.parse(JSON.stringify(rectPinball));
    arrowAllRect();

    console.log('編集ボタンが押された');
    function addSquare(pinball, delay){
      setTimeout(() => {
        const square = document.createElement('button');
        square.style.width = pinball.size / 4 * 3 + 'px';
        square.style.height = pinball.size / 4 * 3 + 'px';
        square.style.backgroundColor = pinball.color;
        square.style.borderRadius = pinball.radiusNum / 4 * 3 +  'px';
        if(pinball.id == edittingNum){
          square.style.opacity = '1';
        }else{
          square.style.opacity = '0.5';
        }
        
        // スタイルを設定
        square.classList.add('editSquare');
        square.id = 'editSquare_' + pinball.id;
        square.addEventListener('mouseover', () => {
          rippleEffect(pinball.id);
        });
        square.addEventListener('click', function() {
          editPinball(pinball.id); // 編集関数を呼び出す
        });

        // 対象の div に追加
        editSquareContainer.appendChild(square);
      }, delay);
    }
    let dlNum = 0;
    pinballs.forEach(pinball => {
      addSquare(pinball, dlNum);
      dlNum += 100;
    });
    editButton.classList.add('playing');
  }else{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballRectSet(pinballs, 1);
    editButton.classList.remove('playing');
    ctx.globalAlpha = 1;
    function fadeAndSlideOut() {
      const children = editSquareContainer.children;
      
      // 各要素にアニメーションを適用
      for (let i = 0; i < children.length; i++) {
        setTimeout(() => {
          children[i].style.animation = 'fadeSlideOut 0.5s forwards';
        }, i * 100); // 0.5秒ごとに次の要素にアニメーションを適用
      }
      return 100
    }
    playSwith();
    waitNum = fadeAndSlideOut()
    setTimeout(() => {editSquareContainer.innerHTML = ''},waitNum);
  }
});


 */

// 角丸正方形を描画する関数
function drawRoundedEffectSquare(ctx, x, y, width, height, radius) {
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
}


function rippleEffect(idNum) {
  const pinball = setPinballs.find(p => p.id === idNum);
  editPinball(pinball.id)
  if (!arrowFlag){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ballRectSet(setPinballs, 0.3);
    arrowFlag = false ;

    //rippleFlag = false;
    
    if (!pinball) return;
    let size = 0; // 波紋の初期サイズ
    const maxSize = pinball.size*2; // 波紋の最大サイズ
    const rippleSpeed = 3; // 波紋が広がる速度
    const lineWidth = 2; // 波紋の線の太さ

    function drawRipple() {
      //ctx.globalAlpha = 0.3; // 波紋の透明度
      ctx.beginPath();
      drawRoundedEffectSquare(ctx, pinball.x - pinball.size/2, pinball.y - pinball.size/2, pinball.size, pinball.size, pinball.size/10);
      ctx.fillStyle = "#ffffff"; // 波紋の色
      ctx.strokeStyle = "#ffffff"; 
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      size += rippleSpeed;
      if (size < maxSize) {
        requestAnimationFrame(drawRipple);
      }
    }
    drawRipple();
    }  
  }
let arrowFlag =false;

function arrowAnimation (pinball){
  if (changeBln) return;
  if (pinball.x <= squareX + pinball.size / 2 ){
    pinball.vx *= -1; // X方向の速度の符号を反転
    playSound(pinball.soundLeft, pinball.vx);
    slideAndFade(pinball.color, 280, pinball.vx, ctxefW, effeCanvasW);
    drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "dash");
  }
  if (pinball.x >= squareX + squareSize - pinball.size / 2){
    pinball.vx *= -1; // X方向の速度の符号を反転
    playSound(pinball.soundRight, pinball.vx);
    slideAndFade(pinball.color, 0, pinball.vx, ctxefE, effeCanvasE); 
    drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "dash");
  }
  // 上か下の壁に当たった場合
  if (pinball.y <= squareY + pinball.size / 2){
    pinball.vy *= -1; // Y方向の速度の符号を反転
    playSound(pinball.soundTop, pinball.vy);
    slideAndFadeHorizontal(pinball.color, 140, pinball.vy, ctxefN, effeCanvasN); 
    drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "dash");
  }
  if (pinball.y >= squareY + squareSize - pinball.size / 2){
    pinball.vy *= -1; // Y方向の速度の符号を反転
    playSound(pinball.soundBottom, pinball.vy);
    slideAndFadeHorizontal(pinball.color, 0, pinball.vy, ctxefS, effeCanvasS);
    drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "dash");
  }
  pinball.x += pinball.vx;
  pinball.y += pinball.vy;
  ctx.fillStyle = pinball.color;
  drawRoundedRect(ctx, pinball.x - pinball.size / 80, pinball.y - pinball.size / 80, pinball.size / 80, pinball.size/ 80, pinball.radiusNum, "fill");
  }
let animID;
function arrowAllRect() {
  if(editFlag) return;
  if(!allBln) return;
  prerectPinball.forEach(pinball => {
    arrowAnimation(pinball);
    
  });
  animID = requestAnimationFrame(arrowAllRect);
}


function arrowRect() {
  //arrowFlag = false;
  if(editFlag) return;
  
  prerectPinball.forEach(pinball => {
    if(pinball.id == edittingNum){
      arrowAnimation(pinball);
    }
  });
  changeBln = !changeBln;
  animID = requestAnimationFrame(arrowRect);
}
let allBln = true;
let changeBln = false;
function editPinball(idNum) {
  document.querySelectorAll('.editSquare').forEach(button => {
    button.style.opacity = '0.5';
  });
  cancelAnimationFrame(animID);
  // クリックされたボタンの透明度を1に設定
  const selectedButton = document.getElementById('editSquare_' + idNum);
  if (selectedButton) {
    arrowFlag = true ;
    selectedButton.style.opacity = '1';
    prerectPinball = JSON.parse(JSON.stringify(rectPinball));
    allBln = false;
    changeBln = true;
    
    arrowRect();
    
  }
  edittingNum = idNum;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballRectSet(setPinballs, 0.3);
}




//resetButton.addEventListener('click', function() {
//  ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
//});

//pianotile.addEventListener('click', function() {
//  if(!pianoFlag){
//    pianotileContainer.style.opacity = "1";
//    pianoFlag = true;
//  }else{
//    pianotileContainer.style.opacity = "0";
//    pianoFlag = false;
//  }  
//});

drawSquare();

function ballRectSet(pinballsData, alpha){
  pinballsData.forEach(pinball => {
    ctx.fillStyle = pinball.color;
    if (pinball.id == edittingNum){
      ctx.globalAlpha = 1;
    }else{
      ctx.globalAlpha = alpha;
    }
    //ctx.shadowOffsetX = -(pinball.x - squareSize / 2) / shadowOffLen; // 影のX方向のオフセット
    //ctx.shadowOffsetY = -(pinball.y - squareSize / 2) / shadowOffLen; // 影のY方向のオフセット
    ctx.shadowBlur = 4; // 影のぼかし量
    ctx.shadowColor = adjustedColor; 
    drawRoundedRect(ctx, pinball.x - pinball.size / 2, pinball.y - pinball.size / 2, pinball.size, pinball.size, pinball.radiusNum, "fill"); // ここでの10は角の丸みの半径
  });
}
// アニメーションループ
function animate() {
  if (!isPlaying) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア
  //drawSquare(); // 枠線を再描画
  //ctx.globalAlpha = 0.5;
  updatePinballs(); // ピンボールを更新
  requestAnimationFrame(animate); // 次のフレームを要求
}

canvas.addEventListener('click', playSwith);
ballRectSet(pinballs, 1);
animate();


