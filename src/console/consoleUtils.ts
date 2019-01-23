import escCode from "./consoleEscCodes";

function bright(str: string) {
    return escCode.bright + str + escCode.reset;
}

export { bright };