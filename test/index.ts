import utils from "./utils/index";
import types from "./types/index";
// import "./console/manualTest";

import Test from "./test";

const test = new Test();

test.runTree(utils);
test.runTree(types);