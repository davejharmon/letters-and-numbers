import * as CONFIG from './config.js';

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
};

export const newNumbersGame = function () {
  // deep duplication (crazy but it works)
  const [[...bignums], [...smallnums]] = [...CONFIG.NUMBERS_SET];

  // shuffle numbers
  bignums.sort(() => Math.random() - 0.5);
  smallnums.sort(() => Math.random() - 0.5);

  // generate new numbers round
  const newNumbersRound = {
    type: 'numbers',
    picks: [],
    stack1: bignums,
    stack2: smallnums,
    target: Math.floor(Math.random() * 900) + 100,
    maxLength: CONFIG.NUMBERS_MAX,
    time: +CONFIG.TIMER_SEC,
    countdown: false,
  };

  //update the state
  state.game.push(newNumbersRound);
  state.round = state.game.length - 1;
  console.log(`ROUND ${state.round}=========`);
  console.log(state.game.at(-1));
};

export const calculateNumbersAnswer = function () {
  // calculate answer here
  console.log('To do: calculate nearest answer algorithm');
};

export const pickNumber = function (stackNum) {
  const key = `stack${stackNum}`;
  const curGame = state.game[state.round];
  const num = curGame[key].shift();
  if (!num) throw new Error('no numbers left bazza');
  state.game[state.round].picks.push(num);
  return num;
};
