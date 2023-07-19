import { Animator } from "./animator";
import { FileInterface } from "./file_interface";
import { Graph } from "./graph";
import { SettingInterface } from "./setting_interface";

function runNextFrame(animator: Animator, timeOfLastFrame: number) {
    const now = new Date().getTime();
    const dt = (now - timeOfLastFrame) / 1000.0;

    animator.update(dt);
    animator.draw();

    requestAnimationFrame(() => runNextFrame(animator, now));
}

window.onload = () => {
    let canvas = document.getElementById("canvas") as HTMLCanvasElement;

    let graph = new Graph();
    let animator = new Animator(graph, canvas);
    let fileInterface = new FileInterface();
    let settingInterface = new SettingInterface();

    fileInterface.addEventListener("file_loaded", (event: CustomEvent) => {
        graph.loadEdgesFromJSON(event.detail.graphdata[25])
    })

    requestAnimationFrame(() => runNextFrame(animator, new Date().getTime()));
}

export {};