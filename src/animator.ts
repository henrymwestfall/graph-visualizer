'use strict'
import { Graph } from "./graph";
import { Vector } from "./node";

export class Animator {
    private graph: Graph;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private renderOffset: Vector;

    // animation settings
    public gravityFactor = 2.0;
    public attractionFactor = 5.0;
    public repulsionFactor = 25.0;

    constructor(graph: Graph, canvas: HTMLCanvasElement) {
        this.graph = graph;
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d')!;

        this.renderOffset = new Vector(this.canvas.width / 2, this.canvas.height / 2)
    }
    
    draw() {
        // clear the canvas for the next frame draw
        this.context.fillStyle = "black"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // draw each edge in the graph
        this.context.strokeStyle = "rgba(255, 255, 255, 0.15)"
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
            this.context.beginPath()
            this.context.arc(
                node.position.x + this.renderOffset.x, 
                node.position.y + this.renderOffset.y, 10.0,
                0, 2 * Math.PI);
            this.context.fill();
        });
    }

    update(dt: number) {
        this.graph.getNodes().forEach(node => {
            let force = node.position.negative().times(this.gravityFactor)
            
            this.graph.getNodes().forEach(other => {
                if (other !== node) {
                    let dist = Math.hypot(node.position.x - other.position.x, 
                        node.position.y - other.position.y) + 0.01; // distance forced to be nonzero

                    let baseForce = node.position.minus(other.position).normalized()

                    if (node.neighbors.has(other) && dist >= 30) { // attraction force
                        force.add(baseForce.times(-dist * this.attractionFactor))
                    } else {  // repulsion force
                        let mag = this.repulsionFactor * (node.neighbors.size + 1) * (other.neighbors.size + 1) / dist
                        force.add(baseForce.times(mag));
                    }

                }
            })
            
            // move the node based on the force and elapsed time
            node.position.add(force.times(0.0001));
        })
    }
}

export default Animator;