import MDPlugin from "../parser/types/plugin";
import Emphasizer from "./abstractEmphasizer";

const pluginsList: MDPlugin[] = [];
const emphasizerList: MDPlugin[] = [];

function addPlugin(plugin: MDPlugin) {
    pluginsList.push(plugin);

    if (plugin instanceof Emphasizer) {
        emphasizerList.push(plugin);
    }
}

export { addPlugin, pluginsList, emphasizerList };