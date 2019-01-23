function randomRange(start: number, end: number): number {
    const diff = end - start;
    return start + Math.random() * diff;
}

function randomIntRange(start: number, end: number): number {
    const diff = end - start;
    return Math.floor(start + Math.random() * diff);
}

function randomMax(max: number): number {
    return Math.random() * max;
}

function randomIntMax(max: number): number {
    return Math.floor(Math.random() * max);
}

export { randomRange, randomIntRange, randomMax, randomIntMax };