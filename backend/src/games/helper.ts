import { shuffle } from "lodash";

const SLOT_OPTIONS = ['C', 'L', 'O', 'W'];

const doSingleRoll = (): string => {
  return shuffle(SLOT_OPTIONS)[Math.floor(Math.random() * SLOT_OPTIONS.length)]
}

export const doRoll = (): string[] => {
  return [
    doSingleRoll(),
    doSingleRoll(),
    doSingleRoll(),
  ]
}

export const getPercentRandom = (): number => {
  return Math.round(Math.random() * 99) + 1;
}
