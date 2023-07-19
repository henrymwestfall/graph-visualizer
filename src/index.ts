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

    let frameCounter = document.getElementById("frameCounter") as HTMLParagraphElement

    let frame = 0;

    fileInterface.addEventListener("file_loaded", (event: CustomEvent) => {
        setInterval(
            () => {
                if (event.detail.graphdata.length == frame) frame = 0;
                graph.loadEdgesFromJSON(event.detail.graphdata[frame]);
                frame += 1;
                frameCounter.innerHTML = `Frame ${frame}`;
            }, 750
        );
    })

    requestAnimationFrame(() => runNextFrame(animator, new Date().getTime()));
}

export {};