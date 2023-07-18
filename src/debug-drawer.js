import * as me from "melonjs";
import { box2d } from "./init-box2d.js";

const sizeOfB2Vec2 = Float32Array.BYTES_PER_ELEMENT * 2;

export default class DebugDrawer {
    constructor(renderer, pixelsPerMeter) {
        this.renderer = renderer;
        this.pixelsPerMeter = pixelsPerMeter;

        const {
            b2Color,
            b2Draw: { e_shapeBit },
            b2Vec2,
            JSDraw,
            wrapPointer
        } = box2d;

        const reifyArray = (array_p, numElements, sizeOfElement, ctor) =>
            Array(numElements)
            .fill(undefined)
            .map((_, index) =>
                wrapPointer(array_p + index * sizeOfElement, ctor)
            );

        self = this;
        const debugDrawer = Object.assign(new JSDraw(), {
            DrawSegment(vert1_p, vert2_p, color_p) {},
            DrawPolygon(vertices_p, vertexCount, color_p) {},
            DrawSolidPolygon(vertices_p, vertexCount, color_p) {
                const color = wrapPointer(color_p, b2Color);
                const vertices = reifyArray(vertices_p, vertexCount,
                    sizeOfB2Vec2, b2Vec2);
                self.drawLines(vertices, color);
            },
            DrawCircle(center_p, radius, color_p) {},
            DrawSolidCircle(center_p, radius, axis_p, color_p) {},
            DrawTransform(transform_p) {},
            DrawPoint(vertex_p, sizeMetres, color_p) {}
        });
        debugDrawer.SetFlags(e_shapeBit);
        this.instance = debugDrawer;
    }

    drawLines(vertices, color) {
        this.renderer.setLineWidth(3);
        this.renderer.beginPath();
        const c = new me.Color(color.r * 255, color.g * 255, color.b * 255, 1);
        this.renderer.setColor(c);
        this.renderer.moveTo(vertices[0].x * this.pixelsPerMeter, vertices[0].y * this.pixelsPerMeter);
        this.renderer.lineTo(vertices[1].x * this.pixelsPerMeter, vertices[1].y * this.pixelsPerMeter);
        this.renderer.lineTo(vertices[2].x * this.pixelsPerMeter, vertices[2].y * this.pixelsPerMeter);
        this.renderer.lineTo(vertices[3].x * this.pixelsPerMeter, vertices[3].y * this.pixelsPerMeter);
        this.renderer.lineTo(vertices[0].x * this.pixelsPerMeter, vertices[0].y * this.pixelsPerMeter);
        this.renderer.stroke();
    }

    clear() {
        this.lines.clear();
    }
}
