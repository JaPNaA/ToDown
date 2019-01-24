/**
 * Array<string>.join, except it completely ignores null
 */
function join(arr: (string | null)[], delimiter: string) {
    return arr.filter(e => e !== null).join(delimiter);
}

export default join;