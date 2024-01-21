let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScoreValue = document.querySelector("#user-score"); 
const compScoreValue = document.querySelector("#comp-score"); 

// console.log(msg);
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  console.log("game was draw.");
  msg.innerText="Game was draw, play again"
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWon,userChoice,compChoice)=>{

    if(userWon){
       userScore++;
       console.log("user score",userScore);
       userScoreValue.innerText = userScore;
       msg.innerText=`you win! Your ${userChoice} beats ${compChoice}`
       msg.style.backgroundColor = "green";
      }else{
        compScore++;
        console.log("comp score",compScore);
        compScoreValue.innerText = compScore;
        msg.innerText=`you lose.  ${compChoice} beats your ${userChoice}`
        msg.style.backgroundColor = "red";
    }
}
const playGame = (userChoice) => {
  console.log("user choice = ", userChoice);
  //genrate comp choice
  const compChoice = genCompChoice();
  console.log("comp choice = ", compChoice);

  if (userChoice === compChoice) {
    //draw
    drawGame();
  } else {
    let userWon = true;
    if (userChoice === "rock") {
      //sci , paper
      userWon = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //sci , rock
      userWon = compChoice === "scissors" ? false : true;
    } else userChoice === "scissors";
    userWon = compChoice === "rock" ? false : true;

    showWinner(userWon ,userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
