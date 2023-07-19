import { Node } from "./node"

export class Graph {
    private edges: Set<Array<Node>>;
    private nodes: Array<Node>;

    private colors: Array<string>;

    constructor() {
        this.edges = new Set();
        this.nodes = [];

        this.colors = [
            "dodgerblue",
            "limegreen",
            "darkorange",
            "blueviolet",
            "deepbluesky"
        ]

        for (let i = 0; i < 200; i++) {
            let node = new Node(i);
            node.position.x = Math.floor(Math.random() * 200) - 100;
            node.position.y = Math.floor(Math.random() * 200) - 100;
            this.nodes.push(node);
        }

    }

    loadFromJSON(json: Object) {
        // load the edges
        this.loadEdgesFromArray(json["edges"]);

        // load the node data. TODO: allow for different color schemes
        for (let i = 0; i < this.nodes.length; i++) {
            let mostSalientIssue = json["most_salient_issue"][i]
            this.nodes[i].color = this.colors[mostSalientIssue]
            this.nodes[i].salience = Math.abs(json[`issue_${mostSalientIssue}`][i])
        }
    }

    loadEdgesFromArray(edges: Array<Array<number>>) {
        this.edges.clear()
        this.nodes.forEach(node => {
            node.resetNeighbors();
        })
        edges.forEach(edge => {
            let u = this.nodes[edge[0]];
            let v = this.nodes[edge[1]];
            this.edges.add([u, v]);
            u.neighbors.add(v);
            v.neighbors.add(u);
        })
    }

    getEdges() {
        return this.edges;
    }

    getNodes() {
        return this.nodes;
    }
}

export default Graph;