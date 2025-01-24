import type * as THREEType from 'three';
import { Mesh, SphereGeometry, ShapeGeometry, BoxGeometry, ShaderMaterial } from 'three';

// Typescript 
import { SceneComponent } from "../SceneComponents";

type Inputs = {
    tagId: string;
    shape: string;
    color1: string,
    color2: string,
    hoverColor1: string,
    hoverColor2: string,
};

export interface IPlaneGeometry extends SceneComponent {
    inputs: Inputs;
}

export class TagComponent extends SceneComponent implements IPlaneGeometry {

    private geometry: SphereGeometry | ShapeGeometry | BoxGeometry;
    private material: ShaderMaterial;
    private material2: ShaderMaterial;
    private mesh: Mesh;
    private THREE: typeof THREEType;

    inputs = {
        tagId: "",
        color1: "black",
        color2: "red",
        hoverColor1: "red",
        hoverColor2: "black",
        shape: "sphere",
    };

    events = {
        "INTERACTION.CLICK": true,
        "INTERACTION.HOVER": true,
    };
    emits = {
        "TAG.CLICK": true,
        "TAG.HOVER": true,
    };

    constructor() {
        super();
        this.onEvent = this.onEvent.bind(this);
        console.log('Started Component', this.inputs.tagId);
    }

    onInit() {
        this.THREE = this.context.three;
        if (this.inputs.shape == "sphere") {
            this.geometry = new this.THREE.SphereGeometry(0.25, 16, 16);
        } else if (this.inputs.shape == "heart") {
            const x = 0;
            const y = 0;
            const heartShape = new this.THREE.Shape();
            heartShape.moveTo(x + 5, y + 5);
            heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
            heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
            heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
            heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
            heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
            heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
            this.geometry = new this.THREE.ShapeGeometry(heartShape);
        } else {
            this.geometry = new this.THREE.BoxGeometry(0.5, 0.5, 0.5);
        }

        this.geometry.computeBoundingSphere();
        this.material = this.createMaterial(this.THREE);
        this.material2 = this.createHoverMaterial(this.THREE);

        this.mesh = new this.THREE.Mesh(this.geometry, this.material);
        this.outputs.collider = this.mesh;
        this.outputs.objectRoot = this.mesh;
    }

    createMaterial(THREE: typeof THREEType) {
        return new THREE.ShaderMaterial({
            uniforms: {
                color1: {
                    value: new THREE.Color(this.inputs.color1),
                },
                color2: {
                    value: new THREE.Color(this.inputs.color2),
                },
            },
            vertexShader: `
			varying vec2 vUv;
			void main() {
			  vUv = uv;
			  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
			}
		  `,
            fragmentShader: `
			uniform vec3 color1;
			uniform vec3 color2;
			varying vec2 vUv;
			void main() {
			  gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
			}
		  `,
            wireframe: false,
        });
    }
    createHoverMaterial(THREE: typeof THREEType) {
        return new THREE.ShaderMaterial({
            uniforms: {
                color1: {
                    value: new THREE.Color(this.inputs.hoverColor1),
                },
                color2: {
                    value: new THREE.Color(this.inputs.hoverColor2),
                },
            },
            vertexShader: `
			varying vec2 vUv;
			void main() {
			  vUv = uv;
			  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
			}
		  `,
            fragmentShader: `
			uniform vec3 color1;
			uniform vec3 color2;
			varying vec2 vUv;
			void main() {
			  gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
			}
		  `,
            wireframe: false,
        });
    }

    onInputsUpdated(previousInputs: Inputs) {
        // Generate new materials and update mesh if colors are changed via inputs
        if (previousInputs.color1 !== this.inputs.color1 || previousInputs.color2 !== this.inputs.color2 || previousInputs.hoverColor1 !== this.inputs.hoverColor1 || previousInputs.hoverColor2 !== this.inputs.hoverColor2) {
            this.material = this.createMaterial(this.context.three);
            this.material2 = this.createHoverMaterial(this.context.three);
            this.mesh = new this.context.three.Mesh(this.geometry, this.material);
        }
    }
    onEvent(eventType: any, data: any) {
        if (eventType === "INTERACTION.CLICK") {
            // Emit to allow click event to be spied on and send TagId
            this.notify("TAG.CLICK", this.inputs.tagId);
        } else if (eventType === "INTERACTION.HOVER") {
            // Emit to allow hover event to be spied on send TagId
            this.notify("TAG.HOVER", this.inputs.tagId);
            if (data.hover && this.mesh !== undefined && this.mesh.material !== undefined) {
                this.mesh.material = this.material2;
                document.body.style.cursor = "pointer";
            } else {
                this.mesh.material = this.material;
                document.body.style.cursor = "auto";
            }
        }
    }
    onDestroy() {
        this.material.dispose();
        this.mesh.geometry.dispose();
    }
}
export function tagComponentFactory() {
    return function () {
        return new TagComponent();
    };
}
