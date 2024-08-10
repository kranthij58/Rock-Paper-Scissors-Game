function setScore(score) {
  localStorage.setItem("score", JSON.stringify(score));
}
function getScore() {
  let score = JSON.parse(localStorage.getItem("score")) || {
    Win: 0,
    Lose: 0,
    Tie: 0,
  };

  return score;
}
let score = getScore();
let result;

scoreDisplay();
let computerMove = "";
let playerMove = "";

function pickComputerMove() {
  let range = Math.random();
  let computerMove = "";
  if (range >= 0 && range < 1 / 3) {
    computerMove = "Rock";
  } else if (range >= 1 / 3 && range < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissor";
  }
  return computerMove;
}
function displayResult() {
  document.querySelector(".display-result").innerHTML = `${result}`;
}

function playGame(playerMove) {
  computerMove = pickComputerMove();
  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      score.Tie += 1;
      result = "Tie.";
    } else if (computerMove === "Paper") {
      result = "You lose.";
      score.Lose += 1;
    } else if (computerMove === "Scissor") {
      score.Win += 1;
      result = "You win.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      score.Win += 1;
      result = "You win.";
    } else if (computerMove === "Paper") {
      score.Tie += 1;
      result = "Tie.";
    } else if (computerMove === "Scissor") {
      score.Lose += 1;
      result = "You lose.";
    }
  } else if (playerMove === "Scissor") {
    if (computerMove === "Rock") {
      score.Lose += 1;
      result = "You lose.";
    } else if (computerMove === "Paper") {
      score.Win += 1;
      result = "You win.";
    } else if (computerMove === "Scissor") {
      score.Tie += 1;
      result = "Tie.";
    }
  }
  setScore(score);

  const choiceElem = document.querySelector(".display-choices");
  choiceElem.innerHTML = `You : <img class = "choices" src = "${playerMove}.png"> Computer : <img class = "choices" src = "${computerMove}.png">`;
}
function scoreDisplay() {
  document.querySelector(
    ".score-display"
  ).innerHTML = `Wins : ${score.Win} Loses : ${score.Lose} Tie : ${score.Tie}`;
  
}

function clearScore() {
  score.Lose = 0;
  score.Tie = 0;
  score.Win = 0;
  setScore(score);
}

let intervalId;
let isAutoPlaying = false;
function autoReplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      let playerMove = pickComputerMove();
      playGame(playerMove);

      scoreDisplay();
    }, 3000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function changeText() {
  let replayElem = document.querySelector(".Replay");
  let Text = replayElem.innerHTML;
  if (Text === "Auto play") {
    replayElem.innerHTML = "stop auto play";
    replayElem.classList.add("changeTheme-replay");
  } else {
    replayElem.innerHTML = "Auto play";
    replayElem.classList.remove("changeTheme-replay");
  }
}

function displayConformation() {
  let resetScoreConform = document.querySelector(".clearScore-conform");
  resetScoreConform.innerHTML =
    'Are you sure you want to reset score <button class = "yes-js-button conform">yes</button><button class = "no-js-button conform">no</button>';
  const yesButtonElem = document.querySelector(".yes-js-button");
  const noButtonElem = document.querySelector(".no-js-button");
  yesButtonElem.addEventListener("click", () => {
    clearScore();

    scoreDisplay();
    resetScoreConform.innerHTML = "";
  });
  noButtonElem.addEventListener("click", () => {
    resetScoreConform.innerHTML = "";
  });
  document.body.addEventListener("keydown", (event) => {
    if (event.key === "y") {
      clearScore();

      resetScoreConform.innerHTML = "";
    } else if (event.key === "n") {
      resetScoreConform.innerHTML = "";
    }
  });
}

const rockButtonElem = document.querySelector(".rock-button");
const paperButtonElem = document.querySelector(".paper-button");
const scissorButtonElem = document.querySelector(".scissors-button");
const replayButtonElem = document.querySelector(".Replay");
const clearScoreButtonElem = document.querySelector(".reset-js-button");
clearScoreButtonElem.addEventListener("click", () => {
  displayConformation();
});
rockButtonElem.addEventListener("click", () => {
  playerMove = "Rock";
  playGame(playerMove);

  displayResult();
  scoreDisplay();
});
paperButtonElem.addEventListener("click", () => {
  playerMove = "Paper";
  playGame(playerMove);

  displayResult();
  scoreDisplay();
});
scissorButtonElem.addEventListener("click", () => {
  playerMove = "Scissor";
  playGame(playerMove);

  displayResult();
  scoreDisplay();
});
replayButtonElem.addEventListener("click", () => {
  autoReplay();
  changeText();
});
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playerMove = "Rock";
    playGame(playerMove);

    displayResult();
    scoreDisplay();
  } else if (event.key === "p") {
    playerMove = "Paper";
    playGame(playerMove);

    displayResult();
    scoreDisplay();
  } else if (event.key === "s") {
    playerMove = "Scissor";
    playGame(playerMove);

    displayResult();
    scoreDisplay();
  } else if (event.key === "a") {
    autoReplay();
    changeText();
  } else if (event.key === "Backspace") {
    displayConformation();
  }
});
