import {Vertex} from "../../Core/Vertex.js";
import {Mesh} from "./Mesh.js";

class Grid extends Mesh {
    #vertices;
    #indices;
    #vertexData;
    constructor(glContext,resolution,shader,color) {
        super(glContext,shader, color);
        this.#vertexData = this.createVertexData(resolution);
        this.#vertices = this.#vertexData.vertices;
        this.#indices = this.#vertexData.indices;
        this.setupMesh(this.#vertices, this.#indices);
    }

    createVertexData(resolution){
        let vertices = [];
        let pos_x, pos_y, pos_z;
        const step = 2 / resolution;

        for (var i = 0, x = 0, z = 0; i < resolution * resolution; i++, x++) {
            let position = [];
            let normal = [0.0, 1.0, 0.0, 1.0];
            if (x === resolution) {
                x = 0;
                z += 1;
            }

            pos_x = ((x + 0.5) * step - 1.0);
            pos_y = 0.0;
            pos_z = ((z + 0.5) * step - 1.0);

            position.push(pos_x);
            position.push(pos_y);
            position.push(pos_z);
            vertices.push(new Vertex(position, normal));

        }

        let indices = [];
        const vertexCount = vertices.length;
        for (var i = 0; i < vertexCount - 1; i++) {

            if ((i + 1) % resolution === 0) {
                continue;
            }

            if(i > vertexCount - resolution - 1){
                continue;
            }

            indices.push(i);
            indices.push(i + resolution);
            indices.push(i + resolution + 1);

            indices.push(i);
            indices.push(i + 1);
            indices.push(i + resolution + 1);

        }

        return {
            vertices : vertices,
            indices : new Uint16Array(indices)
        };
    }
}

export {Grid};