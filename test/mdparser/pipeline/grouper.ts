import Test from "../../test";
import Grouper from "../../../src/mdparser/parser/pipeline/grouper";
import pluginsList from "../../../src/mdparser/pluginsImporter";
import Timer from "../../_utils/timer";
import { inspect } from "util";
import Group from "../../../src/mdparser/parser/types/group";

const str = `
a
# jeep is a car
what about you?
## Do you think jeep is a car # 3as
Because you better
## It's really important#
# okay

**I'm bold**
*I'm itallic*
****I'm both***
* Assuming that it works

_ asdf
_im itallic_
__im bold__
___im both lol___
_underscores_ __look__ ___weird___

## **_I'm nested_**
`;

function test() {
    const groups = new Grouper(str, pluginsList).group();
    logGroups(groups);
}

function logGroups(groups: Group[]) {
    for (let group of groups) {
        console.group(inspect(str.slice(group.start, group.end)));
        logGroups(group.children);
        console.groupEnd();
    }
}

const grouperTest = new Test(function () {
    this.test("group", test);
});

export default grouperTest;