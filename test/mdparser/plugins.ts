import pluginsList from "../../src/mdparser/pluginsImporter";
import Plugin from "../../src/mdparser/parser/types/plugin";
import Test from "../test";

function isStringArray(arr: any): boolean {
    if (!Array.isArray(arr)) { return false; }

    for (let elm of arr) {
        if (typeof elm !== "string") {
            return false;
        }
    }

    return true;
}

function testPlugin(plugin: Plugin) {
    if (plugin.startToken instanceof RegExp) {
        pluginsTest.test("Should have a RegExp as startTokenArr", function () {
            pluginsTest.assertTrue(plugin.startTokenArr instanceof RegExp);
        });
    } else {
        pluginsTest.test("Should have a string[] as startTokenArr", function () {
            pluginsTest.assertTrue(isStringArray(plugin.startTokenArr));
        });
    }

    if (plugin.endToken instanceof RegExp) {
        pluginsTest.test("Should have a RegExp as endTokenArr", function () {
            pluginsTest.assertTrue(plugin.endTokenArr instanceof RegExp);
        });
    } else {
        pluginsTest.test("Should have a string[] as endTokenArr", function () {
            pluginsTest.assertTrue(isStringArray(plugin.endTokenArr));
        });
    }

    if (plugin.stopFindEndToken instanceof RegExp) {
        pluginsTest.test("Should have a RegExp as stopFindEndTokenArr", function () {
            pluginsTest.assertTrue(plugin.stopFindEndTokenArr instanceof RegExp);
        });
    } else {
        pluginsTest.test("Should have a string[] as stopFindEndTokenArr", function () {
            pluginsTest.assertTrue(isStringArray(plugin.stopFindEndTokenArr));
        });
    }

}

const pluginsTest = new Test(function () {
    this.test("pluginsList should have plugins", function () {
        if (pluginsList.length === 0) {
            this.warnWithStack("There are no plugins in pluginsList");
        } else if (pluginsList.length < 0) {
            this.errorWithStack("There seems to be a plugin made out of anti-matter here.");
        }
    });

    this.test("plugins", function () {
        for (let plugin of pluginsList) {
            this.test(plugin.constructor.name, () => testPlugin(plugin));
        }
    });
});

export default pluginsTest;