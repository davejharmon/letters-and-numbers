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

export const findSolution = async function (round) {
  // calculate answer here
  console.log("Let's find a solution...");
  if (round.type === 'numbers') this.crunchNumbers(round);
  // const apiAddress = `http://www.anagramica.com/best/idnetity`;
  // const result = await AJAX(apiAddress);
  // console.log(result);
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
  // FIXME: This is messy, needs refactoring
  const nums = round.picks;
  let randomLargeNum, secondLargestNum;
  // step one: multiply the largest small by a random large to kick us off.
  const largestSmallNum = [...nums].reduce((acc, pick) =>
    pick > acc && pick < 25 ? pick : acc
  );
  nums.splice(nums[nums.indexOf(largestSmallNum)], 1);

  const largeNums = [...round.picks].filter(pick => pick >= 25);
  if (largeNums.length > 0) {
    randomLargeNum = largeNums.at(Math.floor(Math.random() * largeNums.length));
  } else {
    secondLargestNum = [...nums].reduce((acc, pick) =>
      pick > acc ? pick : acc
    );
  }
  const secondNum = randomLargeNum ? randomLargeNum : secondLargestNum;
  nums.splice(nums[nums.indexOf(secondNum)], 1);

  console.log(
    `Largest Small Num is ${largestSmallNum} and second num is ${secondNum}. There are ${nums.lenth} nums remaining.`
  );

  const shuffledPicks = [...round.picks].sort(() => Math.random() - 0.5);
  let num;
  console.log(shuffledPicks);

  // step three: loop through the array attempting a random legal operation in order of complexity

  // TODO: Start by multiplying one big by one small?
  const expr = shuffledPicks.reduce(
    (acc, pick) => {
      const opKey = Math.floor(Math.random() * 4);
      console.log(`Next number is ${pick}...`);
      console.log(acc);

      switch (opKey) {
        case 0:
          console.log("Let's try division first");
          num = acc[0] / pick;

          if (num % 0 && num > 100) return [acc[0] / pick, `${acc[1]}/${pick}`];

        case 1:
          console.log("Let's try multiplication next.");
          num = acc[0] * pick;

          if (num > 0 && num < 1000)
            return [acc[0] * pick, `${acc[1]}*${pick}`];

        case 2:
          console.log("Let's try subtraction third.");
          num = acc[0] - pick;

          if (num >= 100) return [acc[0] - pick, `${acc[1]}-${pick}`];

        case 3:
          console.log("OK fine, we'll add it.");
          return [acc[0] + pick, `${acc[1]}+${pick}`];
      }
    },
    [0, '']
  );
  console.log('All done!');
  console.log(expr);
  round.target.push(expr[0]);
  round.solution = expr[1];
};
