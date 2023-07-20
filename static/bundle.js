(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animator = void 0;
const node_1 = require("./node");
class Animator {
    constructor(graph, canvas) {
        // animation settings
        this.gravityFactor = 2.0;
        this.attractionFactor = 5.0;
        this.repulsionFactor = 25.0;
        this.graph = graph;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.renderOffset = new node_1.Vector(this.canvas.width / 2, this.canvas.height / 2);
    }
    draw() {
        // clear the canvas for the next frame draw
        this.context.fillStyle = "black";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // draw each edge in the graph
        this.context.strokeStyle = "rgba(255, 255, 255, 0.15)";
        this.graph.getEdges().forEach(edge => {
            let start = edge[0].position;
            let end = edge[1].position;
            this.context.beginPath();
            this.context.moveTo(start.x + this.renderOffset.x, start.y + this.renderOffset.y);
            this.context.lineTo(end.x + this.renderOffset.x, end.y + this.renderOffset.y);
            this.context.stroke();
        });
        // draw each node in the graph
        this.graph.getNodes().forEach(node => {
            this.context.fillStyle = node.color;
            this.context.beginPath();
            this.context.arc(node.position.x + this.renderOffset.x, node.position.y + this.renderOffset.y, Math.max(2.0, 20.0 * node.getMaxSalience() / 100.0), 0, 2 * Math.PI);
            this.context.fill();
        });
    }
    update(dt) {
        this.graph.getNodes().forEach(node => {
            let force = node.position.negative().times(this.gravityFactor);
            this.graph.getNodes().forEach(other => {
                if (other !== node) {
                    let dist = Math.hypot(node.position.x - other.position.x, node.position.y - other.position.y) + 0.01; // distance forced to be nonzero
                    let baseForce = node.position.minus(other.position).normalized();
                    if (node.neighbors.has(other) && dist >= 30) { // attraction force
                        force.add(baseForce.times(-dist * this.attractionFactor));
                    }
                    else { // repulsion force
                        let mag = this.repulsionFactor * (node.neighbors.size + 1) * (other.neighbors.size + 1) / dist;
                        force.add(baseForce.times(mag));
                    }
                }
            });
            // move the node based on the force and elapsed time
            node.position.add(force.times(0.0001));
        });
    }
}
exports.Animator = Animator;
exports.default = Animator;

},{"./node":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterface = void 0;
class FileInterface extends EventTarget {
    constructor() {
        super();
        this.form = document.getElementById("upload");
        this.file = document.getElementById("file");
        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
    handleSubmit(event) {
        // stop the form from reloading the page
        event.preventDefault();
        // if there is no file, do nothing
        if (!this.file.value.length)
            return;
        // create reader and read the text of the upload JSON file
        let reader = new FileReader();
        reader.onload = (event) => this.loadFile(event); // create a callback for when the file has been read
        reader.readAsText(this.file.files[0]);
    }
    loadFile(event) {
        let str = event.target.result;
        this.data = JSON.parse(str);
        this.dispatchEvent(new CustomEvent("file_loaded", { detail: { graphdata: this.data["data"] } }));
        console.log("Loaded File");
    }
    get_data() {
        return this.data;
    }
}
exports.FileInterface = FileInterface;
exports.default = FileInterface;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const node_1 = require("./node");
class Graph {
    constructor() {
        this.edges = new Set();
        this.nodes = [];
        this.colors = [
            "dodgerblue",
            "limegreen",
            "darkorange",
            "gold",
            "deepbluesky"
        ];
        for (let i = 0; i < 200; i++) {
            let node = new node_1.Node(i);
            node.position.x = Math.floor(Math.random() * 200) - 100;
            node.position.y = Math.floor(Math.random() * 200) - 100;
            this.nodes.push(node);
        }
    }
    loadFromJSON(json) {
        // load the edges
        this.loadEdgesFromArray(json["edges"]);
        // load the node data. TODO: allow for different color schemes
        for (let i = 0; i < this.nodes.length; i++) {
            let mostSalientIssue = json["most_salient_issue"][i];
            this.nodes[i].color = this.colors[mostSalientIssue];
            this.nodes[i].salience = Math.abs(json[`issue_${mostSalientIssue}`][i]);
        }
    }
    loadEdgesFromArray(edges) {
        this.edges.clear();
        this.nodes.forEach(node => {
            node.resetNeighbors();
        });
        edges.forEach(edge => {
            let u = this.nodes[edge[0]];
            let v = this.nodes[edge[1]];
            this.edges.add([u, v]);
            u.neighbors.add(v);
            v.neighbors.add(u);
        });
    }
    getEdges() {
        return this.edges;
    }
    getNodes() {
        return this.nodes;
    }
}
exports.Graph = Graph;
exports.default = Graph;

},{"./node":5}],4:[function(require,module,exports){
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
    let frameCounter = document.getElementById("frameCounter");
    let frame = 0;
    fileInterface.addEventListener("file_loaded", (event) => {
        setInterval(() => {
            if (event.detail.graphdata.length == frame)
                frame = 0;
            graph.loadFromJSON(event.detail.graphdata[frame]);
            frame += 1;
            frameCounter.innerHTML = `Frame ${frame}`;
        }, 750);
    });
    requestAnimationFrame(() => runNextFrame(animator, new Date().getTime()));
};

},{"./animator":1,"./file_interface":2,"./graph":3,"./setting_interface":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.Vector = void 0;
class Vector {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
    }
    plus(other) {
        let v = this.copy();
        v.add(other);
        return v;
    }
    minus(other) {
        let v = this.copy();
        v.x -= other.x;
        v.y -= other.y;
        return v;
    }
    dividedBy(scalar) {
        let v = this.copy();
        v.x /= scalar;
        v.y /= scalar;
        return v;
    }
    times(scalar) {
        let v = this.copy();
        v.x *= scalar;
        v.y *= scalar;
        return v;
    }
    normalized() {
        let length = Math.hypot(this.x, this.y);
        return this.dividedBy(length);
    }
    negative() {
        return this.times(-1);
    }
}
exports.Vector = Vector;
class Node {
    constructor(node_id, x = 0.0, y = 0.0) {
        this.id = node_id;
        this.position = new Vector(x, y);
        this.neighbors = new Set();
        this.color = "gray";
        this.salience = 0.0;
    }
    resetNeighbors() {
        this.neighbors.clear();
    }
    getMaxSalience() {
        return this.salience;
    }
}
exports.Node = Node;
exports.default = { Vector, Node };

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingInterface = void 0;
class SettingInterface {
    constructor() {
        // query HTML elements for each setting
        this.secondsPerFrame = document.getElementById("secondsPerFrame");
        this.attributeForColorPartition = document.getElementById("attributeForColorPartition");
        this.sizeNodesByDegree = document.getElementById("sizeNodesByDegree");
        this.runAnimation = document.getElementById("runAnimation");
        // set initial values
        this.secondsPerFrame.valueAsNumber = 1.0;
        this.sizeNodesByDegree.checked = false;
        this.runAnimation.checked = true;
    }
    getSecondsPerFrame() {
        return parseFloat(this.secondsPerFrame.value);
    }
    getAttributeForColorPartition() {
        return this.attributeForColorPartition;
    }
    shouldSizeNodesByDegree() {
        return this.sizeNodesByDegree;
    }
    shouldRunAnimation() {
        return this.runAnimation;
    }
}
exports.SettingInterface = SettingInterface;
exports.default = SettingInterface;

},{}]},{},[4]);
