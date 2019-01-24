function intify(num: number) {
    if (num > 0) {
        return Math.floor(num);
    } else {
        return Math.ceil(num);
    }
}

export default intify;