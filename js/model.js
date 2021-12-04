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
      target: [],
      maxLength: 0,
      time: 0,
      countdown: false,
    },
  ],
  playing: false,
  timer: null,
  consolePos: ['up', 'right'],
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
    target: [],
    solution: '',
    maxLength: maxLength,
    maxStack1: gametype === 'numbers' ? 4 : 5, // TODO: magic numbers, should be in config
    maxStack2: 6,
    time: +CONFIG.TIMER_SEC,
    countdown: false,
  };

  // if numbers round, populate targetNums array
  if (gametype === 'numbers') {
    for (let i = 0; i < 7; i++) {
      newRound.target.push(Math.floor(Math.random() * 900) + 100);
    }
  }

  //update the state
  state.game.push(newRound);
  state.round = state.game.length - 1;
  console.log(`ROUND ${state.round} ========= (${gametype})`);
  console.log(state.game.at(-1));
};

export const pickNumber = function (stackNum) {
  const key = `stack${stackNum}`;
  const maxKey = `maxStack${stackNum}`;
  const curGame = state.game[state.round];
  const num = curGame[key].shift();
  curGame[maxKey]--;
  if (curGame[maxKey] < 0)
    throw new Error('Too many choices from this category');
  if (!num) throw new Error('Stack is empty');
  state.game[state.round].picks.push(num);
  return num;
};

export const crunchNumbers = function (round) {
  console.log("Let's find a numbers solution...");
  const nums = [...round.picks];

  // step one: find the largest small under 10 (num1)
  const num1 = [...nums].reduce(
    (acc, num) => (num > acc && num < 10 ? num : acc),
    0
  );
  // step two: find a random large, or sceond largest (num2)
  const num2 = [...nums]
    .sort(() => Math.random() - 0.5)
    .reduce((acc, num) => ((num > acc && num <= 10) || num >= 25 ? num : acc));

  // step three: splice the selected numbers from the array.
  nums.splice(nums.indexOf(num1), 1);
  nums.splice(nums.indexOf(num2), 1);

  // step four: shuffle the remaining picks
  nums.sort(() => Math.random() - 0.5);

  // step five: loop through the array attempting a random legal operation in order of complexity
  const targ = round.target[0];
  let num; // test number

  const expr = nums.reduce(
    (acc, pick) => {
      const opKey = Math.floor(Math.random() * 4);

      switch (opKey) {
        case 0:
          num = acc[0] / pick;

          if (num % 0 && num > 100) return [acc[0] / pick, `${acc[1]}/${pick}`];

        case 1:
          num = acc[0] * pick;

          if (num > 0 && num < 1000)
            return [acc[0] * pick, `${acc[1]}*${pick}`];

        case 2:
          num = acc[0] - pick;

          if (num >= 100) return [acc[0] - pick, `${acc[1]}-${pick}`];

        case 3:
          return [acc[0] + pick, `${acc[1]}+${pick}`];
      }
    },
    [num2 * num1, `(${num2}*${num1})`]
  );
  // console.log(expr);
  round.target.push(expr[0]);
  round.solution = expr[1];
  console.log(expr);
};

export const findSolution = async function (round) {
  // calculate answer here
  console.log("Let's find a solution...");
  console.log(`this is ${this}`);
  if (round.type === 'numbers') this.crunchNumbers(round);
  // const apiAddress = `http://www.anagramica.com/best/idnetity`;
  // const result = await AJAX(apiAddress);
  // console.log(result);
};
