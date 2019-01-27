import Plugin from "../types/plugin";

const pluginsList: Plugin[] = [];

function addPlugin(plugin: Plugin) {
    pluginsList.push(plugin);
}

export { addPlugin, pluginsList };