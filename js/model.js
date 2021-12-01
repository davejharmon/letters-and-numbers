import * as CONFIG from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  round: 0,
  game: [
    {
      type: 'demo', // 'numbers' | 'letters' | 'conundrum'
      picks: [],
      stack1: [],
      stack2: [],
      target: 101,
      maxLength: 0,
      time: 0,
      countdown: false,
    },
  ],
  playing: false,
  timer: null,
};

export const newGame = function (gametype) {
  // deep duplication (crazy but it works)
  let set1, set2, maxLength;
  if (gametype === 'numbers') {
    [[...set1], [...set2]] = [...CONFIG.NUMBERS_SET];
    maxLength = CONFIG.NUMBERS_MAX;
  }

  if (gametype === 'letters') {
    [[...set1], [...set2]] = [...CONFIG.LETTERS_SET];
    maxLength = CONFIG.LETTERS_MAX;
  }

  if (gametype === 'conundrum') {
    console.log('conundrum not implemented yet');
  }

  // shuffle numbers
  set1.sort(() => Math.random() - 0.5);
  set2.sort(() => Math.random() - 0.5);

  // generate new numbers round
  const newRound = {
    type: gametype,
    picks: [],
    stack1: set1,
    stack2: set2,
    target: Math.floor(Math.random() * 900) + 100, // only used in number round
    maxLength: maxLength,
    time: +CONFIG.TIMER_SEC,
    countdown: false,
  };

  //update the state
  state.game.push(newRound);
  state.round = state.game.length - 1;
  console.log(`ROUND ${state.round} ========= (${gametype})`);
  console.log(state.game.at(-1));
};

export const findSolution = async function (round) {
  // calculate answer here
  console.log("Let's find a solution...");
  // const apiAddress = `http://www.anagramica.com/best/idnetity`;
  // const result = await AJAX(apiAddress);
  // console.log(result);
};

export const pickNumber = function (stackNum) {
  const key = `stack${stackNum}`;
  const curGame = state.game[state.round];
  const num = curGame[key].shift();
  if (!num) throw new Error('no numbers left bazza');
  state.game[state.round].picks.push(num);
  return num;
};
