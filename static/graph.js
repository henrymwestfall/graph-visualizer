"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
const node_1 = require("./node");
class Graph {
    constructor() {
        this.edges = new Set();
        this.nodes = [];
        for (let i = 0; i < 200; i++) {
            let node = new node_1.Node(i);
            node.position.x = Math.floor(Math.random() * 200) - 100;
            node.position.y = Math.floor(Math.random() * 200) - 100;
            this.nodes.push(node);
        }
    }
    loadEdgesFromJSON(json) {
        this.loadEdgesFromArray(json["edges"]);
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
//# sourceMappingURL=graph.js.map