import * as model from './model.js';
import * as CONFIG from './config.js';
import headerView from './views/headerView.js';
import gameboardView from './views/gameboardView.js';
import buttonsView from './views/buttonsView.js';
import backendView from './views/backendView.js';
////////////////////////////////////////

const handleGameButtons = function (btnAction) {
  const currentRound = model.state.game[model.state.round];

  // step zero: test for timer button
  if (btnAction === 'timer') startGame(currentRound);

  // step one: test for full boxes
  if (currentRound.picks.length >= currentRound.maxLength) return;

  // step two: try and add a box
  try {
    const num = model.pickNumber(btnAction);
    gameboardView.show(num);
  } catch (err) {
    gameboardView.renderError(err, false);
  }

  // if final box, reveal timer
  if (currentRound.picks.length === currentRound.maxLength) {
    armTimer(currentRound);
    model.findSolution(currentRound);
  }
};

const armTimer = function (round) {
  buttonsView.toggleVis('timer');
};

const startGame = function (currentRound) {
  // step zero: start the timer
  currentRound.countdown = true;
  model.state.timer = setInterval(() => {
    if (currentRound.time === 0) {
      currentRound.countdown = false;
      clearInterval(model.state.timer);
      return;
    }
    currentRound.time--;
    buttonsView.update(currentRound);
  }, 1000);

  if (currentRound.type === 'numbers') {
    headerView.loadNumbersGame(currentRound);

    // perform the cecil animation (randomising number)
    const cecil = setInterval(() => {
      console.log(currentRound);
      headerView.update(currentRound);
      currentRound.target.shift();
      if (currentRound.target.length === 0) clearInterval(cecil);
    }, 100);
  }
};

/**
 * Handle button presses on the console.
 * @param {String} label The label on the button clicked
 */

const handleConsole = function (label) {
  // clear timer
  if (model.state.timer) clearInterval(model.state.timer);
  // create game object
  model.newGame(label.slice(4));
  // update view
  const currentRound = model.state.game[model.state.round];
  headerView.render(currentRound, true, true);
  gameboardView.render(currentRound);
  buttonsView.render(currentRound);
};

const init = function () {
  console.log('Hello world...');
  backendView.addHandlerConsole(handleConsole);
  buttonsView.addHandlerGameButtons(handleGameButtons);
};

init();

////////////////////////////////////////
// Old code

// // game format constructor
// const lettersGame = {
//   vowels: ['A', 'E', 'I', 'O', 'U'],
//   consonants: [
//     'B',
//     'C',
//     'D',
//     'F',
//     'G',
//     'H',
//     'J',
//     'K',
//     'L',
//     'M',
//     'N',
//     'P',
//     'Q',
//     'R',
//     'S',
//     'T',
//     'V',
//     'W',
//     'X',
//     'Y',
//     'Z',
//   ],
//   unsolved: false,
// };

// const numbersGame = {
//   large: [25, 50, 75, 100],
//   small: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//   unsolved: false,
//   timer: 30,
// };

// const episode = [
//   lettersGame,
//   lettersGame,
//   numbersGame,
//   lettersGame,
//   lettersGame,
//   numbersGame,
//   lettersGame,
//   numbersGame,
// ];

// // element selectors
// const PUZZLE_EL = document.querySelector('.puzzle');
// const LETNUM_EL = document.querySelector('.lettersNumbers');
// const BUTTON1_EL = document.getElementById('button1');
// const BUTTON2_EL = document.getElementById('button2');
// const BUTTON_TIMER_EL = document.getElementById('buttonTimer');

// // initialise number round
// const testEp = episode[2]; // literal assignment
// testEp.large.sort(() => Math.random() - 0.5);
// testEp.small.sort(() => Math.random() - 0.5);

// BUTTON1_EL.textContent = 'LARGE';
// BUTTON2_EL.textContent = 'SMALL';
// const pickedNumbers = [];

// // event listeners
// BUTTON1_EL.addEventListener('click', function () {
//   pickNum('large');
// });
// BUTTON2_EL.addEventListener('click', function () {
//   pickNum('small');
// });
// BUTTON_TIMER_EL.addEventListener('click', function () {
//   startRound('numbers');
// });

// // functions
// function pickNum(numType) {
//   console.warn('Click!');
//   let msg = '';
//   if (testEp[numType].length <= 0) {
//     msg = `Error: no ${numType} numbers left`;
//   } else if (pickedNumbers.length == 6) {
//     msg = `That's quite enough numbers`;
//   } else {
//     pickedNumbers.push(testEp[numType].pop());
//     updatePuzzle(...pickedNumbers);
//     msg = pickedNumbers;
//   }
//   updateConsole(msg);
//   if (pickedNumbers.length == 6) armTimer('numbers');
// }

// function updateConsole(message) {
//   console.log(message);
// }

// function updatePuzzle() {
//   LETNUM_EL.innerText = [...pickedNumbers];
// }

// function armTimer(round) {
//   if (round == 'numbers') {
//     // activate timer button
//     BUTTON_TIMER_EL.classList.remove('hidden');
//   }
// }

// function startRound(round) {
//   crunchNumberPuzzle();
//   startTimer();
// }

// function crunchNumberPuzzle() {
//   const expr = [...pickedNumbers];
//   let puzzleAnswer = 0;
//   let puzzleExpression = '';
//   expr.sort(() => Math.random() - 0.5);
//   // take a random number and add it to zero
//   puzzleExpression = String(expr[expr.length - 1]);
//   puzzleAnswer = expr[expr.length - 1];
//   expr.pop();
//   console.log(`current expression length: ${expr.length}`);
//   console.log(expr);
//   // loop taking a random remaining number and apply a random operation to it until no numbers are left
//   for (let i = 0; i < expr.length; i++) {
//     let opKey = Math.floor(Math.random() * 4);
//     console.log(`opKey is ${opKey}`);
//     switch (opKey) {
//       // TO DO: only apply and break if the number resulting is a whole number less than 2000
//       case 3: // division
//         console.log(`lets try dividing ${expr[i]} from ${puzzleAnswer}`);
//         if (puzzleAnswer % expr[i] == 0 && puzzleAnswer / expr[i] > 0) {
//           puzzleAnswer /= expr[i];
//           if (
//             puzzleExpression.slice(-3).includes('+') ||
//             puzzleExpression.slice(-3).includes('-')
//           ) {
//             puzzleExpression = '(' + puzzleExpression + ')/' + expr[i];
//           } else {
//             puzzleExpression = puzzleExpression + '/' + expr[i];
//           }
//           break;
//         } else {
//           console.log(`Nah number way too funky, let's try somethig else`);
//         }
//       case 2: // multiplication
//         console.log(`lets try multiplying ${expr[i]} from ${puzzleAnswer}`);
//         if (puzzleAnswer * expr[i] <= 999) {
//           puzzleAnswer *= expr[i];
//           if (
//             puzzleExpression.slice(-3).includes('+') ||
//             puzzleExpression.slice(-3).includes('-')
//           ) {
//             puzzleExpression = '(' + puzzleExpression + ')*' + expr[i];
//           } else {
//             puzzleExpression = puzzleExpression + '*' + expr[i];
//           }
//           break;
//         } else {
//           console.log(`Nah number way too big, let's try somethig else`);
//         }

//       case 1: // subtraction
//         console.log(`lets try subtracting ${expr[i]} from ${puzzleAnswer}`);
//         if (puzzleAnswer - expr[i] > 0) {
//           puzzleAnswer -= expr[i];
//           puzzleExpression += '-' + expr[i];
//           break;
//         } else {
//           console.log("nah number would get below zero, let's just add");
//         }
//       case 0: // addition
//         console.log(`lets try adding ${expr[i]} from ${puzzleAnswer}`);
//         puzzleAnswer += expr[i];
//         puzzleExpression += '+' + expr[i];
//         break;
//     }
//     updateConsole(puzzleAnswer, puzzleExpression);
//   }
//   // return the final number and the expression to reach it
//   console.log(puzzleAnswer, puzzleExpression);
//   PUZZLE_EL.innerText = puzzleAnswer;
// }

// function startTimer() {
//   let timeLeft = testEp.timer;
//   BUTTON_TIMER_EL.textContent = timeLeft;
//   BUTTON_TIMER_EL.classList.add('timerMode');
//   setInterval(function () {
//     timeLeft--;
//     BUTTON_TIMER_EL.textContent = timeLeft;
//   }, 1000);
// }

// // // document variables initialised
// // const SCORE0_EL = document.getElementById('score--0');
// // const SCORE1_EL = document.querySelector('#score--1');
// // const DICE_EL = document.querySelector('.dice');
// // const NEWGAME_BTN_EL = document.querySelector('.btn--new');
// // const ROLLDICE_BTN_EL = document.querySelector('.btn--roll');
// // const HOLD_BTN_EL = document.querySelector('.btn--hold');
// // const CURRENTSCORE0_EL = document.getElementById('current--0');
// // const CURRENTSCORE1_EL = document.getElementById('current--1');
// // const PLAYER0_EL = document.querySelector('.player--0');
// // const PLAYER1_EL = document.querySelector('.player--1');

// // // initialise game
// // SCORE0_EL.textContent = 0;
// // SCORE1_EL.textContent = 0;
// // DICE_EL.classList.add('hidden');

// // // event listeners
// // NEWGAME_BTN_EL.addEventListener('click', newGame);
// // ROLLDICE_BTN_EL.addEventListener('click', bet);
// // HOLD_BTN_EL.addEventListener('click', hold);

// // // global variables
// // let scores, pot, activePlayer, playing, diceRoll;
// // newGame();

// // // function library
// // function rollDie() {
// //   const roll = Math.trunc(Math.random() * 6) + 1;
// //   DICE_EL.classList.remove('hidden');
// //   DICE_EL.src = `dice-${roll}.png`;
// //   return roll;
// // }

// // function hold() {
// //   if (playing) {
// //     // 1. add pot to current player's score
// //     scores[activePlayer] += pot;
// //     document.getElementById(`score--${activePlayer}`).textContent =
// //       scores[activePlayer];
// //     // 2. check if current player's score >= 100 else
// //     scores[activePlayer] >= 100 ? endGame() : switchPlayer();
// //     DICE_EL.classList.add('hidden');
// //   }
// // }

// // function newGame() {
// //   scores = [0, 0];
// //   diceRoll = 0;
// //   pot = 0;
// //   CURRENTSCORE0_EL.textContent = 0;
// //   CURRENTSCORE1_EL.textContent = 0;
// //   SCORE0_EL.textContent = 0;
// //   SCORE1_EL.textContent = 0;
// //   PLAYER0_EL.classList.remove('player--winner');
// //   PLAYER1_EL.classList.remove('player--winner');
// //   PLAYER0_EL.classList.add('player--active');
// //   PLAYER1_EL.classList.remove('player--active');
// //   activePlayer = 0;
// //   playing = true;
// // }

// // function bet() {
// //   if (playing) {
// //     diceRoll = rollDie();
// //     if (diceRoll !== 1) {
// //       // good roll! Add to current score
// //       pot += diceRoll;
// //       document.getElementById(`current--${activePlayer}`).textContent = pot;
// //     } else {
// //       // bad roll! switch current player
// //       switchPlayer();
// //     }
// //   }
// // }

// // function switchPlayer() {
// //   document.getElementById(`current--${activePlayer}`).textContent = 0;
// //   activePlayer = activePlayer === 0 ? 1 : 0;
// //   PLAYER0_EL.classList.toggle('player--active');
// //   PLAYER1_EL.classList.toggle('player--active');
// //   pot = 0;
// // }

// // function endGame() {
// //   playing = false;
// //   document
// //     .querySelector(`.player--${activePlayer}`)
// //     .classList.remove('player--active');
// //   document
// //     .querySelector(`.player--${activePlayer}`)
// //     .classList.add('player--winner');
// // }
