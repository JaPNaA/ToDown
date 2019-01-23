import defaultIfUndef from "../../../../src/mdparser/parser/utils/defaultIfUndef";
import Test from "../../../test";

const undef: any[] = [undefined, undefined, 1];
const def: any[] = [
    null,
    0,
    1,
    -0,
    -1,
    "",
    [],
    {},
    ["a"],
    [undefined],
    [undef],
    "asdf",
    {
        an: "object",
        lol: undefined
    }
];
const defaultValues: any[] = undef.concat(def);

function testAllUndefined(arr: any[], returns: any[]) {
    for (let val of arr) {
        for (let defaultReturn of returns) {
            testOneUndefined(val, defaultReturn);
        }
    }
}

function testOneUndefined(value: any, defaultReturn: any) {
    defaultIfUndefTest.assertEquals(
        defaultIfUndef(value, defaultReturn),
        defaultReturn
    );
}

function testAllDefined(arr: any[], returns: any[]) {
    for (let val of arr) {
        for (let defaultReturn of returns) {
            testOneDefined(val, defaultReturn);
        }
    }
}

function testOneDefined(value: any, defaultReturn: any) {
    defaultIfUndefTest.assertEquals(
        defaultIfUndef(value, defaultReturn),
        value
    );
}

const defaultIfUndefTest = new Test(function () {
    this.test("undefined, return default", function () {
        testAllUndefined(undef, defaultValues);
    });

    this.test("defined, return value", function () {
        testAllDefined(def, defaultValues);
    });
});

export default defaultIfUndefTest;