import { TIMER_SEC, NUMBERS_SET } from './config.js';

export const state = {
  round: 0,
  game: [
    {
      type: 'none',
      picks: [],
      stack: [],
      solution: '',
    },
  ],
  playing: false,
};

export const newNumbersGame = function () {
  // increment the round

  // generate new numbers round
  const newNumbersRound = {
    type: 'numbers',
    picks: [],
    stack: NUMBERS_SET,
    solution: '',
  };

  // calculate solution
  newNumbersRound.solution = 666; // TEMP

  //update the state
  state.game.push(newNumbersRound);
  state.round = state.game.length;
};
