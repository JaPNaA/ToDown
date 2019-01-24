import HParagraph from "./elements/p";
import HDom from "./dom";
import HTextNode from "./nodes/text";
import HAnchor from "./elements/a";

class HFactory {
    public static createRoot(): HDom {
        return new HDom();
    }

    public static createText(str: string): HTextNode {
        return new HTextNode(str);
    }

    public static createP(): HParagraph {
        return new HParagraph();
    }

    public static createA(): HAnchor {
        return new HAnchor();
    }
}

export default HFactory;