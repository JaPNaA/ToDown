class MDParser {
    static parse(markdownStr: string) {
        return "<h1> This markdown wasn't parsed! </h1> <div> " + markdownStr + " </div>";
    }
}

export default MDParser;