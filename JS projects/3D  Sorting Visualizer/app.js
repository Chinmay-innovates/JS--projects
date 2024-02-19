const n = 20;
arr = [];
myCanvas.width = 400;
myCanvas.height = 300;
margin = 30;

let audioContext = null;
function playNote(freq ,type) {
  if (audioContext == null) {
    audioContext = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.2;
  const osc = audioContext.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.type=type;
  osc.stop(audioContext.currentTime + dur);
  const node = audioContext.createGain();
  node.gain.value = 0.4;
  //To remove the buzzing(clicking noise) sound at end
  node.gain.linearRampToValueAtTime(0, audioContext.currentTime + dur);
  osc.connect(node);
  node.connect(audioContext.destination);
}

for (let i = 0; i < n; i++) {
  arr[i] = Math.random();
}
cols = [];
spacing = (myCanvas.width - margin * 2) / n;
ctx = myCanvas.getContext("2d");
maxColHeight = 200;

for (let i = 0; i < arr.length; i++) {
  const tilt = i * 3;
  const x = i * spacing + spacing / 2 + margin;
  const y = myCanvas.height - margin - tilt;
  const width = spacing - 5;
  const height = maxColHeight * arr[i];
  cols[i] = new Column(x, y, width, height);
}

let moves = bubbleSort(arr);
animate();
console.log(moves);
function bubbleSort(arr) {
  const moves = [];
  do {
    var swapped = false;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        swapped = true;
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        moves.push({
          indices: [i - 1, i],
          swap: true,
        });
      } else {
        moves.push({
          indices: [i - 1, i],
          swap: false,
        });
      }
    }
  } while (swapped);
  return moves;
}

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  let changed = false;
  for (let i = 0; i < cols.length; i++) {
    changed = cols[i].draw(ctx) || changed;
  }
  if (!changed && moves.length > 0) {
    const move = moves.shift();
    const [i, j] = move.indices;
    const waveType = move.swap ? "square" : "sine";
    playNote(cols[i].height+ cols[j].height, waveType);
    if (move.swap) {
      cols[i].moveTo(cols[j]);
      cols[j].moveTo(cols[i], -1);
      [cols[i], cols[j]] = [cols[j], cols[i]];
    } else {
      cols[i].jump();
      cols[j].jump();
    }
  }
  requestAnimationFrame(animate);
}
