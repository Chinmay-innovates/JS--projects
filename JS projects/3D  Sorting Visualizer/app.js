const n = 20;
myCanvas.width = 400;
myCanvas.height = 300;
const margin = 30;

const arr = [];
for (let i = 0; i < n; i++) {
  arr[i] = Math.random();
}
const cols = [];
const spacing = (myCanvas.width - margin * 2) / n;
const ctx = myCanvas.getContext("2d");
const maxColHeight = 200;

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
// console.log(moves);
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
  let changed;
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    changed=false;
  for (let i = 0; i < cols.length; i++) {
    changed = cols[i].draw(ctx) || changed;
  }
  if (!changed && moves.length > 0) {
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.swap==true) {
      cols[i].moveTo(cols[j]);
      cols[j].moveTo(cols[i]);
      [cols[i], cols[j]] == [cols[j], cols[i]];
    } else {
      //to-do
    }
  }
  requestAnimationFrame(animate);
}
