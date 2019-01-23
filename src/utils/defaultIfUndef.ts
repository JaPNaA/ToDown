function defaultIfUndef<T>(val: T | undefined, defaultVal: T): T {
    if (val === undefined) {
        return defaultVal;
    } else {
        return val;
    }
}

export default defaultIfUndef;