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
//# sourceMappingURL=graph.js.map