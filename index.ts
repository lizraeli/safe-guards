import "core-js/stable";
import "regenerator-runtime/runtime";
import * as core from "./src/core";
import * as array from "./src/array";
import * as pair from "./src/pair";
import * as threeTuple from "./src/threeTuple";
import * as shape from "./src/shape";
import * as types from "./src/types";

export default {
  ...core,
  ...array,
  ...pair,
  ...threeTuple,
  ...shape,
  ...types,
};
