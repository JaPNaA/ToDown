import MDPlugin from "../types/plugin";
import GroupPlugin from "../types/groupPlugin";
import TextGroup from "../types/groupText";
import Range from "../../../types/range";
import Group from "../types/group";

class Grouper {
    private markdown: string;
    private pluginsList: MDPlugin[];
    private substr: string;
    private substrOffset: number;
    private groups: Group[];

    private lastTextStart: number;
    private lastChar: string;

    constructor(markdown: string, pluginsList: MDPlugin[]) {
        // reason for + \n: makes plugin matching easier
        this.markdown = this.substr = markdown + '\n';
        this.substrOffset = 0;
        this.groups = [];
        this.pluginsList = pluginsList;

        this.lastChar = '\n';
        this.lastTextStart = -1;
    }

    public group() {
        while (this.isMoreToParse()) {
            this.groupOne();
        }

        for (let group of this.groups) {
            group.groupChildren(this.markdown);
        }

        if (this.lastTextStart >= 0) {
            this.addText();
        }

        return this.groups;
    }

    private groupOne(): void {
        const match = this.findMatch();
        if (match) {
            this.addText();
            this.moveAheadWithMatch(match);
            this.groups.push(match);
        } else {
            if (this.lastTextStart < 0) {
                this.lastTextStart = this.substrOffset;
            }
            this.moveAhead(1);
        }
    }

    private findMatch(): GroupPlugin | null {
        for (let plugin of this.pluginsList) {
            const match = this.findAndCheckMatch(plugin);
            if (match) {
                return match;
            }
        }

        return null;
    }

    private addText() {
        if (this.lastTextStart < 0) { return; }
        this.groups.push(new TextGroup(this.lastTextStart, this.substrOffset, this.markdown));
        this.lastTextStart = -1;
    }

    private findAndCheckMatch(plugin: MDPlugin): GroupPlugin | null {
        if (!this.pluginFirstCharCompatible(plugin)) {
            return null;
        }

        const match = this.findMatchGroup(plugin);
        if (!match) { return null; }

        if (!this.pluginLastCharCompatible(plugin, match)) {
            return null;
        }

        return match;
    }

    private pluginFirstCharCompatible(plugin: MDPlugin) {
        if (plugin.beforeStartChar) {
            return this.lastChar === plugin.beforeStartChar;
        } else {
            return true;
        }
    }

    private pluginLastCharCompatible(plugin: MDPlugin, match: GroupPlugin) {
        if (plugin.afterEndChar) {
            const charAfterMatch = this.markdown[match.end];
            return charAfterMatch === plugin.afterEndChar;
        } else {
            return true;
        }
    }

    private findMatchGroup(plugin: MDPlugin): GroupPlugin | null {
        const match = this.getMatch(this.substr, plugin.startToken);
        if (match) {
            const endToken = plugin.getDynamicEndToken(match.sliceOn(this.markdown));
            const end = this.findStop(match, endToken, plugin.stopFindEndToken);

            if (end) {
                return new GroupPlugin(match.start, end.end, match.end, end.start, this.markdown, plugin);
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
        for (let i = startMatch.length(); i < this.substr.length; i++) {
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

    private moveAheadWithMatch(match: GroupPlugin) {
        if (match.plugin.captureEndToken) {
            this.moveAhead(match.length());
        } else {
            this.moveAhead(match.inner.end - match.start);
        }
    }

    private moveAhead(distance: number): void {
        this.lastChar = this.substr[distance - 1];
        this.substr = this.substr.slice(distance);
        this.substrOffset += distance;
    }
}

export default Grouper;