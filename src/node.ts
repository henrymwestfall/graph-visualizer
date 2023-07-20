export class Vector {
    public x: number;
    public y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    add(other: Vector) {
        this.x += other.x;
        this.y += other.y;
    }

    plus(other: Vector) {
        let v = this.copy()
        v.add(other);
        return v;
    }

    minus(other: Vector) {
        let v = this.copy()
        v.x -= other.x;
        v.y -= other.y;
        return v;
    }

    dividedBy(scalar: number) {
        let v = this.copy()
        v.x /= scalar;
        v.y /= scalar;
        return v;
    }

    times(scalar: number) {
        let v = this.copy()
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

export class Node {
    public id: number;
    public position: Vector;
    public neighbors: Set<Node>;
    public color: string;
    public salience: number;

    constructor(node_id: number, x: number = 0.0, y: number = 0.0) {
        this.id = node_id;
        this.position = new Vector(x, y);
        this.neighbors = new Set();
        this.color = "gray";
        this.salience = 0.0;
    }

    resetNeighbors() {
        this.neighbors.clear()
    }

    getMaxSalience() {
        return this.salience;
    }
}

export default { Vector, Node };