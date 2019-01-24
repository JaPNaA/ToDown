import intify from "./intify";

function randomRange(start: number, end: number): number {
    const diff = end - start;
    return start + Math.random() * diff;
}

function randomIntRange(start: number, end: number): number {
    if (end < start) {
        return randomIntRange(end, start);
    }

    const diff = end - start;
    const result = start + Math.random() * diff;

    return intify(result);
}

function randomMax(max: number): number {
    return Math.random() * max;
}

function randomIntMax(max: number): number {
    return intify(Math.random() * max);
}

export { randomRange, randomIntRange, randomMax, randomIntMax };