'use strict'
import { Graph } from "./graph";
import { Vector } from "./node";

export class Animator {
    private graph: Graph;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private renderOffset: Vector;

    // animation settings
    public gravityFactor = 0.2;
    public attractionFactor = 0.6;
    public repulsionFactor = 0.25;

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
        this.context.strokeStyle = "#AAA"
        this.graph.getEdges().forEach(edge => {
            let start = edge[0].position;
            let end = edge[1].position;

            this.context.beginPath();
            this.context.moveTo(start.x + this.renderOffset.x, start.y + this.renderOffset.y);
            this.context.lineTo(end.x + this.renderOffset.x, end.y + this.renderOffset.y);
            this.context.stroke();
        });

        // draw each node in the graph
        this.context.fillStyle = "cyan"
        this.graph.getNodes().forEach(node => {
            this.context.beginPath()
            this.context.arc(node.position.x + this.renderOffset.x, node.position.y + this.renderOffset.y, 3, 0, 2 * Math.PI);
            this.context.fill();
        });
    }

    update(dt: number) {
        this.graph.getNodes().forEach(node => {
            let forceX = -node.position.x * this.gravityFactor;
            let forceY = -node.position.y * this.gravityFactor;
            
            this.graph.getNodes().forEach(other => {
                if (other !== node) {
                    let dist = Math.hypot(node.position.x - other.position.x, 
                        node.position.y - other.position.y) + 0.01; // distance forced to be nonzero

                    if (node.neighbors.has(other) && dist >= 30) { // attraction force
                        forceX += this.attractionFactor * (other.position.x - node.position.x) / dist
                        forceY += this.attractionFactor * (other.position.y - node.position.y) / dist
                    } else {  // repulsion force
                        forceX += this.repulsionFactor * (node.position.x - other.position.x) / dist
                        forceY += this.repulsionFactor * (node.position.y - other.position.y) / dist
                    }

                }
            })
            
            // move the node based on the force and elapsed time
            node.position.x += forceX * dt;
            node.position.y += forceY * dt;
        })
    }
}

export default Animator;