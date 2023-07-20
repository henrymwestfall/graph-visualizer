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
//# sourceMappingURL=animator.js.map