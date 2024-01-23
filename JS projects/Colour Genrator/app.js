const btn = document.querySelector("#btn");
const colorCode = document.querySelector("#color-code");
const copyText= document.querySelector("#copyText");
// console.log(colorCode);

const copy =() =>{
let copyText = colorCode;

color = navigator.clipboard.writeText(copyText.value);
console.log(color);
alert("color copied:  "+color.value);
}
const getColor = () => {
  //hex code
  const randNum = Math.floor(Math.random() * 16777215);
  const randCode = "#" + randNum.toString(16);
  //inserting hexcode
  document.body.style.backgroundColor = randCode;
  colorCode.innerHTML =randCode;
  console.log(randCode);
};
btn.addEventListener("click", getColor);

//init call
getColor();
