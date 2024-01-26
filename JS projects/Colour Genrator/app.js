const btn = document.querySelector("#btn");
const colorCode = document.querySelector("#color-code");
const copyText = document.querySelector("#copyText");
// console.log(colorCode);
var button = document.getElementById("copy-col");
var hexCol = document.getElementById("hex-col");

const copyToClipboard = (copy) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(copy);
  }
  return Promise.reject("The Clipboard API is not available");
};
copyToClipboard();

button.onclick = function () {
  navigator.clipboard.readText().then(function () {
    const result = (document.getElementById(hexCol).innerText = getColor());
    console.log(typeof result);
    console.log(result);
  navigator.clipboard.writeText(res.valueOf(result));
  });
};

const copy = () => {
  return navigator.clipboard.writeText(test);
};
const getColor = () => {
  //hex code
  const randNum = Math.floor(Math.random() * 16777215);
  const randCode = "#" + randNum.toString(16);
  //inserting hexcode
  document.body.style.backgroundColor = randCode;
  colorCode.innerHTML = randCode;
  return randCode;
};
btn.addEventListener("click", getColor);

//init call
getColor(randCode);
