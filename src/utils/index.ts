const _ = require("lodash");

/** Get random number */
export const random_number = (min: number, max: number) => {
  return _.random(min, max);
};
