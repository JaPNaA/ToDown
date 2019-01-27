import Plugin from "../types/plugin";
import GroupPlugin from "../types/group";

class Grouper {
    // private markdown: string;
    private pluginsList: Plugin[];
    private substr: string;
    private groups: GroupPlugin[];

    constructor(markdown: string, pluginsList: Plugin[]) {
        this.substr = markdown;
        this.groups = [];
        this.pluginsList = pluginsList;
    }

    public group() {
        while (this.isMoreToParse()) {
            this.groupOne();
        }

        return this.groups;
    }

    private groupOne(): void {
        const match = this.findMatch();
        if (true) {
            this.moveAhead(1);
            this.groups.push();
        } else {
            this.moveAhead(1);
        }
    }

    private findMatch() {
        for (let plugin of this.pluginsList) {
            if (this.isMatch(plugin.startTokenArr)) {
                //
            }
        }
    }

    private isMatch(tokenArr: RegExp | string[]): boolean {
        if (tokenArr instanceof RegExp) {
            return this.isMatchRegexp(tokenArr);
        } else {
            return this.isMatchStringArr(tokenArr);
        }
    }

    private isMatchRegexp(regex: RegExp): boolean {
        return false;
    }

    private isMatchStringArr(tokens: string[]): boolean {
        return false;
    }

    private isMoreToParse(): boolean {
        return this.substr.length > 0;
    }

    private moveAhead(distance: number): void {
        this.substr = this.substr.slice(distance);
    }
}

export default Grouper;