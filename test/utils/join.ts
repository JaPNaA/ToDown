import Test from "../test";
import join from "../../src/utils/join";

function testJoin(input: (string | null)[], expected: string): void {
    joinTest.assertEquals(join(input, ","), expected);
}

const joinTest = new Test(function() {
    this.test("Simple", function() {
        testJoin(["a", "b"], "a,b");
    });
    this.test("With null", function() {
        testJoin(["a", "b", null, "c", null, "d", "e"], "a,b,c,d,e");
    });
});

export default joinTest;