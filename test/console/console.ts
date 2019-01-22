import escCode from "./consoleEscCodes";
import { inspect } from "util";

const PADD_SIZE = 11;
const lineBreakpoints = " -.?!;:(){}[]/";

const preErrorStr: string =
    escCode.bgRed + escCode.fgWhite +
    "  ERROR  " +
    escCode.reset + escCode.fgRed +
    " ";

const errorPadding: string =
    "        " +
    escCode.bgRed +
    " " +
    escCode.reset +
    " " +
    escCode.fgRed;

const preWarnStr: string =
    escCode.reset + escCode.fgYellow +
    "  WARN  " +
    escCode.bgYellow +
    " " +
    escCode.reset +
    " " +
    escCode.fgYellow;

const warnPadding: string =
    "        " +
    escCode.bgYellow +
    " " +
    escCode.reset +
    " " +
    escCode.fgYellow;

const preInfoStr: string =
    escCode.reset + escCode.fgCyan +
    "  INFO  " +
    escCode.bgCyan +
    " " +
    escCode.reset +
    " " +
    escCode.fgCyan;

const infoPadding: string =
    "        " +
    escCode.bgCyan +
    " " +
    escCode.reset +
    " " +
    escCode.fgCyan;

const postStr = escCode.reset + "\n";

function error(message: string): void;
function error(title: string, message: string): void;

function error(a: string, b?: string) {
    if (b === undefined) {
        error_messageOnly(a);
    } else {
        error_withTitle(a, b);
    }
}

function error_withTitle(message: string, title: string) {
    error_messageOnly(bright(title) + "\n" + message);
}

function error_messageOnly(message: string) {
    const formatted = padd(message, errorPadding);
    console.error(preErrorStr + formatted + postStr);
}

function warn(message: string): void;
function warn(title: string, message: string): void;

function warn(a: string, b?: string) {
    if (b === undefined) {
        warn_messageOnly(a);
    } else {
        warn_withTitle(a, b);
    }
}

function warn_withTitle(title: string, message: string) {
    warn_messageOnly(bright(title) + "\n" + message);
}

function warn_messageOnly(message: string) {
    const formatted = padd(message, warnPadding);
    console.error(preWarnStr + formatted + postStr);
}

function info(message: string): void;
function info(title: string, message: string): void;

function info(a: string, b?: string) {
    if (b === undefined) {
        info_messageOnly(a);
    } else {
        info_withTitle(a, b);
    }
}

function info_withTitle(title: string, message: string) {
    info_messageOnly(bright(title) + "\n" + message);
}

function info_messageOnly(message: string) {
    const formatted = padd(message, infoPadding);
    console.error(preInfoStr + formatted + postStr);
}

function padd(message: string, padding: string): string {
    const lines = stringToLines(message);
    const str: string[] = [];

    str.push(lines[0]);
    for (let i = 1; i < lines.length; i++) {
        str.push(padding + lines[i]);
    }

    return str.join("\n");
}

function bright(str: string) {
    return escCode.bright + str + escCode.reset;
}

function stringToLines(string: string): string[] {
    const returnStr: string[] = [];
    const maxLineLength = getMaxLineLength();
    let lastAppendedIndex = 0;

    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        const lineLength = i - lastAppendedIndex;

        if (char === '\n') {

            returnStr.push(string.slice(lastAppendedIndex, i));
            lastAppendedIndex = i + 1;

        } else if (lineLength >= maxLineLength) {

            const wrappedTextResult = wrapOneLine(string, lastAppendedIndex, i);
            returnStr.push(
                wrappedTextResult.line
            );
            lastAppendedIndex = wrappedTextResult.index;

        }
    }

    returnStr.push(string.slice(lastAppendedIndex, string.length));

    return returnStr;
}

function wrapOneLine(str: string, start: number, end: number): { line: string, index: number } {
    const rest = str.slice(start, end);

    const lastSpace = getLastLineBreakpoint(rest);

    if (lastSpace >= 0) {
        return {
            line: rest.slice(0, lastSpace),
            index: start + lastSpace + 1
        }
    } else {
        return {
            line: rest,
            index: end
        };
    }
}

function getLastLineBreakpoint(str: string) {
    for (let i = str.length - 1; i >= 0; i--) {
        for (let breakpoint of lineBreakpoints) {
            if (str[i] === breakpoint) {
                return i;
            }
        }
    }
    return -1;
}

function getMaxLineLength(): number {
    if (process.stdout) {
        if (process.stdout.columns) {
            return process.stdout.columns - PADD_SIZE;
        } else {
            return Infinity;
        }
    } else {
        return 80 - PADD_SIZE;
    }
}

export { error, warn, info };