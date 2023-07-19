"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const animator_1 = require("./animator");
const file_interface_1 = require("./file_interface");
const graph_1 = require("./graph");
const setting_interface_1 = require("./setting_interface");
function runNextFrame(animator, timeOfLastFrame) {
    const now = new Date().getTime();
    const dt = (now - timeOfLastFrame) / 1000.0;
    animator.update(dt);
    animator.draw();
    requestAnimationFrame(() => runNextFrame(animator, now));
}
window.onload = () => {
    let canvas = document.getElementById("canvas");
    let graph = new graph_1.Graph();
    let animator = new animator_1.Animator(graph, canvas);
    let fileInterface = new file_interface_1.FileInterface();
    let settingInterface = new setting_interface_1.SettingInterface();
    fileInterface.addEventListener("file_loaded", (event) => {
        graph.loadEdgesFromJSON(event.detail.graphdata[25]);
    });
    requestAnimationFrame(() => runNextFrame(animator, new Date().getTime()));
};
//# sourceMappingURL=index.js.map