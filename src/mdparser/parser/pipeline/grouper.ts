import Plugin from "../types/plugin";
import GroupPlugin from "../types/group";
import Range from "../../../types/range";

class Grouper {
    // private markdown: string;
    private pluginsList: Plugin[];
    private substr: string;
    private substrOffset: number;
    private groups: GroupPlugin[];

    constructor(markdown: string, pluginsList: Plugin[]) {
        this.substr = markdown;
        this.substrOffset = 0;
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
        if (match) {
            this.moveAhead(match.length());
            this.groups.push(match);
        } else {
            this.moveAhead(1);
        }
    }

    private findMatch(): GroupPlugin | null {
        for (let plugin of this.pluginsList) {
            const match = this.getMatch(this.substr, plugin.startToken);
            if (match) {
                const end = this.findStop(match, plugin.endToken, plugin.stopFindEndToken);
                
                if (end) {
                    return new GroupPlugin(match.start, end.end, match.end, end.start, plugin);
                }
            }
        }

        return null;
    }

    private getMatch(substr: string, tokenArr: RegExp | string): Range | null {
        if (tokenArr instanceof RegExp) { // possible optimization: don't check if is regex every time
            return this.getMatchRegex(substr, tokenArr);
        } else {
            return this.getMatchStringArr(substr, tokenArr);
        }
    }

    private findStop(startMatch: Range, endTokenArr: RegExp | string, stopFindToken: RegExp | string): Range | null {
        for (let i = startMatch.start; i < this.substr.length; i++) {
            const substr = this.substr.slice(i);
            const match = this.getMatch(substr, endTokenArr);

            if (match) {
                return match.offset(i);
            } else if (this.getMatch(substr, stopFindToken)) {
                return null;
            }
        }

        return null;
    }

    private getMatchRegex(substr: string, regex: RegExp): Range | null {
        const match = substr.match(regex);
        if (!match) { return null; }
        return new Range(0, match[0].length).offset(this.substrOffset);
    }

    private getMatchStringArr(substr: string, token: string): Range | null {
        if (substr.startsWith(token)) {
            return new Range(0, token.length).offset(this.substrOffset);
        } else {
            return null;
        }
    }

    private isMoreToParse(): boolean {
        return this.substr.length > 0;
    }

    private moveAhead(distance: number): void {
        this.substr = this.substr.slice(distance);
        this.substrOffset += distance;
    }
}

export default Grouper;