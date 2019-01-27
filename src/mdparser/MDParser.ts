import HFactory from "./htmlGen/hFactory";

class MDParser {
    static parseToString(markdownStr: string) {
        const root = HFactory.createRoot();
        const a = HFactory.createA();
        root.appendChild(a);
        a.href = "https://japnaa.gitlab.io/";
        a.appendChild(HFactory.createText("hello world"));

        return root.toString();
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