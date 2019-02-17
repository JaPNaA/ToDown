import HNode from "./node";

class HDom {
    rootElms: HNode[];

    constructor() {
        this.rootElms = [];
    }

    public appendChild(child: HNode) {
        this.rootElms.push(child);
    }

    public toString() {
        return this.rootElms.map(elm => elm.toString()).join('');
    }

    public toElements(): DocumentFragment {
        const docFrag = document.createDocumentFragment();
        for (let elm of this.rootElms) {
            docFrag.appendChild(elm.toElement());
        }

        return docFrag;
    }
}

export default HDom;