import { randomRange, randomIntRange, randomMax, randomIntMax } from "../../src/utils/random";
import Test from "../test";

function isInt(x: number): boolean {
    return x === Math.floor(x);
}

function isInBounds(min: number, x: number, max: number): boolean {
    if (min < max) {
        return min <= x && x < max;
    } else {
        return max < x && x <= min;
    }
}

function isInBoundsInt(_min: number, _x: number, _max: number): boolean {
    if (_min > _max) {
        return isInBoundsInt(_max, _x, _min);
    }

    const min = Math.floor(_min);
    const x = _x;
    const max = Math.ceil(_max);

    if (min === max) {
        if (max === x) {
            return true;
        } else {
            return false;
        }
    }

    if (x > 0) {
        return min <= x && x < max;
    } else {
        return min < x && x <= max;
    }
}

function testRandomRangeOnce(): boolean {
    const max = randomRange(-1000, 1000);
    const min = randomRange(-1000, 1000);
    const num = randomRange(min, max);

    return isInBounds(min, num, max);
}

function testRandomIntRangeOnce(): boolean {
    const max = randomRange(-1000, 1000);
    const min = randomRange(-1000, 1000);
    const num = randomIntRange(min, max);

    return isInBoundsInt(min, num, max) && isInt(num)
}

function testRandomMaxOnce(): boolean {
    const max = randomRange(-1000, 1000);
    const num = randomMax(max);
    return isInBounds(0, num, max);
}

function testRandomIntMaxOnce(): boolean {
    const max = randomRange(-1000, 1000);
    const num = randomIntMax(max);

    return isInBounds(0, num, max) && isInt(num);
}


const randomTest = new Test(function () {
    this.test("Random range", function () {
        this.iterateAssertTrue(testRandomRangeOnce);
    });
    this.test("Random int range", function () {
        this.iterateAssertTrue(testRandomIntRangeOnce);
    });
    this.test("Random max", function () {
        this.iterateAssertTrue(testRandomMaxOnce);
    });
    this.test("Random int max", function () {
        this.iterateAssertTrue(testRandomIntMaxOnce);
    });
});

export default randomTest;