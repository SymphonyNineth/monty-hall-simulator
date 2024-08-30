"use strict";

const numberOfChoices = 3;

const numberOfRounds = 100000;

function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}
function getRandomSituation(number, isCorrect) {
  return { number, isCorrect };
}
function createOneGame() {
  const game = Array(numberOfChoices)
    .fill(0)
    .map((_, index) => getRandomSituation(index, false));
  const shuffled = shuffleArray(game);
  shuffled[0].isCorrect = true;
  return shuffled;
}
function getRandomNumber() {
  return Math.floor(Math.random() * 3);
}
function removeOthers(game, number) {
  const currentSituation = game.find(
    (situation) => situation.number === number
  );
  if (!currentSituation.isCorrect) {
    return game.filter((sitatuon) => {
      const value = sitatuon.isCorrect || sitatuon.number === number;
      return value;
    });
  } else {
    game.find(situation => situation.isCorrect === false).notDelete = true;
    return game.filter((sitatuon) => {
        const value = sitatuon.isCorrect || sitatuon.notDelete;
        return value;
      });
  }
}

function playGame(changeInitialChoice) {
  let result = 0;
  for (let i = 0; i < numberOfRounds; i++) {
    const game = createOneGame();
    const number = getRandomNumber();
    const remaining = removeOthers(game, number);
    if (changeInitialChoice) {
      const chosen = remaining.find((sitatuon) => sitatuon.number !== number);
      if (chosen.isCorrect) { 
        result++;
      }
    } else {
      const chosen = remaining.find((sitatuon) => sitatuon.number === number);
      if (chosen.isCorrect) {
        result++;
      }
    }
  }
  return `${(result / numberOfRounds) * 100}%`;
}

console.log(`Results when the initial choice is changed ${playGame(true)}`);
console.log(`Results when the initial choice is not changed ${playGame(false)}`);
