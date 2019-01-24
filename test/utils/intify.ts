import Test from "../test";
import intify from "../../src/utils/intify";


function testManualIntify() {
    initifyManualTest(0, 0);
    initifyManualTest(0.2, 0);
    initifyManualTest(0.5, 0);
    initifyManualTest(0.8, 0);
    initifyManualTest(0.9999999999999999, 0);
    initifyManualTest(1852001570640.1, 1852001570640);
    initifyManualTest(1852001570640.9, 1852001570640);
}

function initifyManualTest(toIntify: number, expectedResult: number) {
    intifyTest.assertEquals(intify(toIntify), expectedResult);
    intifyTest.assertEquals(intify(-toIntify), -expectedResult);
}

function testIntifyNegative() {
    for (let i = 0; i > -1000; i--) {
        intifyTest.assertEquals(
            intify(-Math.random() + i), i
        )
    }
}

function testIntifyPositive() {
    for (let i = 0; i < 1000; i++) {
        intifyTest.assertEquals(
            intify(Math.random() + i), i
        )
    }
}

const intifyTest = new Test(function() {
    this.test("Simple", function () {
        this.assertEquals(intify(0.1), 0);
        this.assertEquals(intify(0.9), 0);
        this.assertEquals(intify(-0.1), -0);
        this.assertEquals(intify(-0.9), -0);
        this.assertEquals(intify(1.1), 1);
        this.assertEquals(intify(1.9), 1);
        this.assertEquals(intify(-1.1), -1);
        this.assertEquals(intify(-1.9), -1);
    });
    this.test("Manual mappings", function() {
        testManualIntify();
    });
    this.test("Intify negative", function() {
        testIntifyNegative();
    });
    this.test("Intify positive", function () {
        testIntifyPositive();
    });
});

export default intifyTest;