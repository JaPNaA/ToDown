import { info, warn, error } from "./console/console";
import { AssertionError } from "assert";

type TestFunc = (this: Test) => any;
type NestedStringTestObj = {
    [x: string]: NestedStringTestObj | Test
};

class Test {
    private func?: Function;
    private stack: string[] = [];
    private stackTrace?: string;

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
        try { func.call(this); } catch (e) { }
        this.stack.pop();
    }

    public assert(v: boolean) {
        if (typeof v !== "boolean") {
            this.warnWithStack("Asserting value is not a boolean");
        }

        if (!v) {
            this.errorWithStack("Assert true failed");
            throw new AssertionError();
        }
    }

    private errorWithStack(message: string) {
        error(this.stackToString(), message);
    }

    private warnWithStack(message: string) {
        warn(this.stackToString(), message);
    }

    private infoWithStack(message: string) {
        info(this.stackToString(), message);
    }

    private stackToString(): string {
        if (this.stack.length < 1) {
            if (this.stack.length === 0) {
                return "[unknown]";
            } else {
                return this.stack[0];
            }
        }

        const stackStr = [this.stack[0]];
        const stack = this.cleanStack(this.stackTrace);
        let i: number = 1;

        for (; i < this.stack.length - 1; i++) {
            stackStr.push("." + this.stack[i]);
        }

        stackStr.push(": " + this.stack[i]);

        stackStr.push("\n");
        stackStr.push(stack);

        return stackStr.join("");
    }

    private cleanStack(stack: string | undefined) {
        if (!stack) {
            return "No stack";
        }

        let stackStr = stack;

        stackStr = this.removeFirstLines(stackStr, 2);
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
}

export default Test;