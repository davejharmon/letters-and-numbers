import * as model from './model.js';
import * as CONFIG from './config.js';
import headerView from './views/headerView.js';
import gameboardView from './views/gameboardView.js';
import buttonsView from './views/buttonsView.js';
import backendView from './views/backendView.js';
import backendNavView from './views/backendNavView.js';
import View from './views/view.js';
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
    gameboardView.boxError();
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
    // if (currentRound.time === 10) gameboardView.warning(); // TODO: nice global animation
    buttonsView.update(currentRound);
  }, 1000);

  if (currentRound.type === 'numbers') {
    headerView.loadNumbersGame(currentRound);

    // perform the cecil animation (randomising number)
    const cecil = setInterval(() => {
      console.log(currentRound);
      headerView.update(currentRound);
      currentRound.target.shift(); // FIXME:, shouldn't modify the model.
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

const handleNavBar = function (label) {
  console.log(`Clicked ${label}`);
  let navDir;

  if (label == 'navTitle') {
    model.state.consolePos[0] == 'down' ? 'up' : 'down';
    navDir = model.state.consolePos[0];
  }
  if (label == 'navLeft') navDir = model.state.consolePos[1] = 'left';
  if (label == 'navRight') navDir = model.state.consolePos[1] = 'right';

  backendView.moveConsole(navDir);
  backendNavView.render(model.state.consolePos);
};
const init = function () {
  console.log('Hello world...');
  console.log(`Console pos ${model.state.consolePos}`);
  backendView.addHandlerConsole(handleConsole);
  buttonsView.addHandlerGameButtons(handleGameButtons);
  backendNavView.addHandlerBackendNav(handleNavBar);
};

init();

////////////////////////////////////////
// Old code
