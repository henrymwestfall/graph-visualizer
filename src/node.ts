export class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y
    }
}

export class Node {
    public id: number;
    public position: Vector;
    public neighbors: Set<Node>;

    constructor(node_id: number, x: number = 0.0, y: number = 0.0) {
        this.id = node_id;
        this.position = new Vector(x, y);
        this.neighbors = new Set();
    }

    resetNeighbors() {
        this.neighbors.clear()
    }
}

export default { Vector, Node };