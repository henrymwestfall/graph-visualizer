"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.Vector = void 0;
class Vector {
    constructor(x = 0.0, y = 0.0) {
        this.x = x;
        this.y = y;
    }
}
exports.Vector = Vector;
class Node {
    constructor(node_id, x = 0.0, y = 0.0) {
        this.id = node_id;
        this.position = new Vector(x, y);
        this.neighbors = new Set();
    }
}
exports.Node = Node;
exports.default = { Vector, Node };
//# sourceMappingURL=node.js.map