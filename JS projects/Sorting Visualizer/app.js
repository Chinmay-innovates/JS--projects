const n = 20;
const arr = [];

init(); //testing purpose
let audioContext = null;
function playNote(freq) {
  if (audioContext == null) {
    audioContext = new (AudioContext ||
      webkitAudioContext ||
      window.webkitAudioContext)();
  }
  const dur = 0.1;
  const osc = audioContext.createOscillator();
  osc.frequency.value = freq;
  osc.start();
  osc.stop(audioContext.currentTime + dur);
  const node = audioContext.createGain();
  node.gain.value = 0.1;
  //To remove the buzzing(clicking noise) sound at end
  node.gain.linearRampToValueAtTime(0, audioContext.currentTime + dur);
  osc.connect(node);
  node.connect(audioContext.destination);
}

// function to initialize arr
function init() {
  for (let i = 0; i < n; i++) {
    arr[i] = Math.random();
  }
  showBars();
}

//function to play sort
function play() {
  const copy = [...arr];
  const moves = bubbleSort(copy);
  animate(moves);
  document.getElementById("init").disabled = true;
  document.getElementById("play").disabled = true;
}

//function to animate sort
function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type == "swap") {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  playNote(200 + arr[i] * 700);
  playNote(200 + arr[j] * 700);
  showBars(move);
  setTimeout(() => {
    animate(moves);
  }, 50);
}

//function to sort arr
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
          type: "swap",
        });
      }
    }
  } while (swapped);
  return moves;
}

//function to show bars
function showBars(move) {
  container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = arr[i] * 100 + "%";
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type === "swap" ? "red" : "blue";
    }
    container.appendChild(bar);
  }
}
