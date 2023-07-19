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
}
exports.Node = Node;
exports.default = { Vector, Node };
//# sourceMappingURL=node.js.map