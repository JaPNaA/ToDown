import { info, warn, error } from "../src/console/console";
import { AssertionError } from "assert";
import { inspect } from "util";
import { bright } from "../src/console/consoleUtils";

type TestFunc = (this: Test) => any;
type NestedStringTestObj = {
    [x: string]: NestedStringTestObj | Test
};

enum Equals {
    not, is, onlyValue
};

class Test {
    private func?: Function;
    private stack: string[] = [];
    private stackTrace?: string;

    private static ignoreLineRegexp = /(\/test\/test\.ts)|__webpack_require__/;
    private static testIterations = 1e5;

    constructor(func?: TestFunc) {
        this.func = func;
    }

    public runTree(tree: NestedStringTestObj) {
        for (let index in tree) {
            this.stack.push(index);

            const i = tree[index];

            if (i instanceof Test) {
                i.runTest_stack(this.stack);
            } else {
                this.runTree(i);
            }

            this.stack.pop();
        }

        this.infoWithStack("Test done");
    }

    public runTest_stack(newStack: string[]) {
        const oldStack = this.stack;
        this.stack = newStack;
        this.runTest();
        this.stack = oldStack;
    }

    public runTest() {
        if (this.func) {
            this.func();
        } else {
            throw new Error("No test function was specified to run");
        }
    }

    public test(name: string, func: TestFunc) {
        this.stack.push(name);
        this.stackTrace = new Error().stack;
        try {
            func.call(this);
        } catch (e) {
            this.errorWithStack("An error occured while testing");
        }
        this.stack.pop();
    }

    public assertTrue(v: boolean) {
        if (typeof v !== "boolean") {
            this.warnWithStack("Asserting value is not a boolean");
        }

        if (!v) {
            this.errorWithStack("Assert true failed");
            this.throwError();
        }
    }

    public iterateAssertTrue(func: () => boolean) {
        for (let i = 0; i < Test.testIterations; i++) {
            this.assertTrue(func());
        }
    }

    public assertNotEquals(a: any, b: any) {
        const result = this.testEquals(a, b);

        if (result === Equals.is) {
            this.errorWithStack(
                "Assert not equals failed\n" + inspect(a) +
                "\nequals\n" + inspect(b)
            );
            this.throwError();
        } else if (result === Equals.onlyValue) {
            this.warnWithStack(
                "Assert not equals warn\n" + inspect(a) +
                "\nis equal to\n" + inspect(b) +
                "\nbut are different types"
            );
        }
    }

    public assertEquals(a: any, b: any) {
        const result = this.testEquals(a, b);

        if (result === Equals.not) {
            this.errorWithStack(
                "Assert equals failed\n" + inspect(a) +
                "\ndoes not equal\n" + inspect(b)
            );
            this.throwError();
        } else if (result === Equals.onlyValue) {
            this.warnWithStack(
                "Assert equals warn\n" + inspect(a) +
                "\nis equal to\n" + inspect(b) +
                "\nbut are not the same type"
            );
        }
    }

    private testEquals(a: any, b: any): Equals {
        if (a === b) {
            return Equals.is;
        } else if (a == b) {
            return Equals.onlyValue;
        } else {
            return Equals.not;
        }
    }

    private throwError(): void {
        throw new AssertionError();
    }

    private errorWithStack(message: string) {
        error(message, this.stackToString());
    }

    private warnWithStack(message: string) {
        warn(message, this.stackToString());
    }

    private infoWithStack(message: string) {
        info(message, this.stackToString());
    }

    private stackToString(): string {
        const stackTrace = this.cleanStackTrace(this.stackTrace);
        return bright(this.testCallStackToString())
            + "\n" + stackTrace;
    }

    private testCallStackToString() {
        if (this.stack.length <= 1) {
            if (this.stack.length === 0) {
                return "[anonymous]";
            } else {
                return this.stack[0];
            }
        }

        const stackStr = [this.stack[0]];
        let i: number = 1;

        for (; i < this.stack.length - 1; i++) {
            stackStr.push("." + this.stack[i]);
        }

        stackStr.push(": " + this.stack[i]);

        return stackStr.join("");
    }

    private cleanStackTrace(stack: string | undefined): string {
        if (!stack) {
            return "No stack";
        }

        let stackStr = stack;

        stackStr = this.removeFirstLines(stackStr, 2);
        stackStr = this.removeTestFromStack(stackStr);
        stackStr = stackStr.replace(/webpack:\/\/\//g, "");

        return stackStr;
    }

    private removeFirstLines(str: string, amount: number): string {
        let returnStr = str;

        for (let i = 0; i < amount; i++) {
            returnStr = returnStr.slice(returnStr.indexOf("\n") + 1);
        }

        return returnStr;
    }

    private removeTestFromStack(str: string): string {
        const lines = str.split("\n");
        const returnStrArr: string[] = [];

        let lastWasSkipped = false;

        for (let line of lines) {
            if (Test.ignoreLineRegexp.test(line)) {
                if (lastWasSkipped) { continue; }
                returnStrArr.push(" ... ");
                lastWasSkipped = true;
            } else {
                returnStrArr.push(line);
                lastWasSkipped = false;
            }
        }

        return returnStrArr.join("\n");
    }
}

export default Test;