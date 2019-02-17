import HParagraph from "./elements/p";
import HDom from "./dom";
import HTextNode from "./nodes/text";
import HAnchor from "./elements/a";
import HStrong from "./elements/strong";
import HEmphasis from "./elements/emphasis";
import HHeading from "./elements/heading";

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

    public static createStrong(): HStrong {
        return new HStrong();
    }

    public static createEmphasis(): HEmphasis {
        return new HEmphasis();
    }

    public static createHeading(level: number): HHeading {
        return new HHeading(level);
    }
}

export default HFactory;