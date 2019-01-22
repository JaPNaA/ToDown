import Range from "../types/range";
import defaultIfUndef from "./defaultIfUndef";

type Comparator<T> = (a: T, b: T) => number;

function binarySearch(arr: any[], target: number): number;
function binarySearch<T>(arr: any[], target: number, comparator: Comparator<T>): number;

function binarySearch<T>(arr: T[], target: T, _comparator?: Comparator<T>): number {
    const arrLen = arr.length;
    const comparator: Comparator<T> = defaultIfUndef(_comparator, defaultComparator);
    const possibleRange: Range = new Range(0, arrLen);

    while (true) {
        const position = possibleRange.middleIndex();
        const node = arr[position];
        const result = comparator(node, target);

        if (result > 0) {
            possibleRange.start = position;
        } else if (result < 0) {
            possibleRange.end = position;
        } else {
            return position;
        }
    }
}


function defaultComparator(a: any, b: any): number {
    return b - a;
}

export default binarySearch;