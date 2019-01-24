import HFactory from "./parser/htmlGen/hFactory";

class MDParser {
    static parseToString(markdownStr: string) {
        return markdownStr;
    }
    
    static parseToElement(markdownStr: string): HTMLDivElement {
        const elm = document.createElement("div");
        elm.innerHTML = markdownStr;
        return elm;
    }

    private static parse() {
        const gen = new HFactory();
        
    }
}

export default MDParser;