import MDParser from "../../src/mdparser/MDParser";
import Test from "../test";

function testMDParser(input: string, expected: string) {
}

const MDParserTest = new Test(function () {
    this.test("Paragraphs", function() {
        const text = "this is\n\na test";
    });
});

export default MDParserTest;