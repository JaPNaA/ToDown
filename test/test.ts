import { info, warn, error } from "../src/console/console";
import { inspect } from "util";
import { bright } from "../src/console/consoleUtils";
import Timer from "./_utils/timer";

type TestFunc = (this: Test) => any;
type NestedStringTestObj = {
    [x: string]: NestedStringTestObj | Test
};

enum Equals {
    not, is, onlyValue
};

class Test {
    private func?: Function;
    private positionStack: string[] = [];
    private stackTrace?: string;

    private static ignoreLineRegexp = /(\/test\/test\.ts)|__webpack_require__/;
    private static testIterations = 1e6;

    constructor(func?: TestFunc) {
        this.func = func;
    }

    public runTree(tree: NestedStringTestObj) {
        for (let index in tree) {
            this.positionStack.push(index);

            const i = tree[index];

            if (i instanceof Test) {
                i.runTest_stack(this.positionStack);
            } else {
                this.runTree(i);
            }

            this.positionStack.pop();
        }
    }

    public runTest_stack(newStack: string[]) {
        const oldStack = this.positionStack;
        this.positionStack = newStack;
        this.runTest();
        this.positionStack = oldStack;
    }

    public runTest() {
        if (!this.func) {
            this.throwError("No test function was specified to run");
            return;
        }

        const timer = new Timer();

        try {
            timer.start();
            this.func();
        } catch (e) {
            this.errorWithStack("An error occured while running test\n" + inspect(e));
        }

        const deltaTime = timer.getDeltaMillis();

        this.infoWithPosition(
            "Test done\n" +
            deltaTime + "ms"
        );
    }

    public test(name: string, func: TestFunc) {
        this.positionStack.push(name);
        this.stackTrace = new Error().stack;
        try {
            func.call(this);
        } catch (e) {
            this.errorWithStack("An error occured while testing\n" + inspect(e));
        }
        this.positionStack.pop();
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

    public assertArrayEquals(a: any[], b: any[]) {
        if (a.length !== b.length) {
            this.errorWithStack(
                "Assert array equals failed\n" + inspect(a) +
                "\ndoes not equal the length of \n" + inspect(b)
            );
            this.throwError();
            return;
        }

        for (let i = 0; i < a.length; i++) {
            const result = this.testEquals(a[i], b[i]);
            
            if (result === Equals.not) {
                this.errorWithStack(
                    "Assert array equals failed\n" + inspect(a) +
                    "\ndoes not equal\n" + inspect(b) + 
                    "\nat index " + i
                );
                this.throwError();
            } else if (result === Equals.onlyValue) {
                this.warnWithStack(
                    "Assert array equals warn\n" + inspect(a) +
                    "\nis equal to\n" + inspect(b) +
                    "\nbut are not the same type at index " + i
                );
            }
        }
    }

    public assertContains(container: string, ...containees: string[]) {
        for (let containee of containees) {
            if (!container.includes(containee)) {
                this.errorWithStack(
                    "Assert contains fail\n" + inspect(container) +
                    "\ndoes not contain\n" + inspect(containee)
                );
                this.throwError();
            }
        }
    }

    public errorWithStack(message: string) {
        error(message, this.stackToString());
    }

    public warnWithStack(message: string) {
        warn(message, this.stackToString());
    }

    public infoWithStack(message: string) {
        info(message, this.stackToString());
    }

    public errorWithPosition(message: string) {
        error(message, this.getPositionString());
    }

    public warnWithPosition(message: string) {
        warn(message, this.getPositionString());
    }

    public infoWithPosition(message: string) {
        info(message, this.getPositionString());
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

    private throwError(message?: string): void {
        throw new Error(message);
    }

    private stackToString(): string {
        const stackTrace = this.cleanStackTrace(this.stackTrace);
        return bright(this.getPositionString())
            + "\n" + stackTrace;
    }

    private getPositionString() {
        if (this.positionStack.length <= 1) {
            if (this.positionStack.length === 0) {
                return "[anonymous]";
            } else {
                return this.positionStack[0];
            }
        }

        const stackStr = [this.positionStack[0]];
        let i: number = 1;

        for (; i < this.positionStack.length - 1; i++) {
            stackStr.push("." + this.positionStack[i]);
        }

        stackStr.push(": " + this.positionStack[i]);

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