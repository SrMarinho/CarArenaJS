import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { objController } from '../controllers/objController.js';

class MatchRoom {
    constructor(scene, camera) {
        this.scene = scene
        this.camera = camera
        this.originalObjs = {}
        this.objs = {}
    }

    setup() {
        const loader = new GLTFLoader()

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(-27.81, 10.65, 29.35).normalize();
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffeedd, 3);
        directionalLight2.position.set(20, 15, -20).normalize();
        this.scene.add(directionalLight2);

        // Luz Pontual 1 - Foco no Carro
        const pointLightCar = new THREE.PointLight(0xffaa66, 8, 20);
        pointLightCar.position.set(
        3.11,
        1.77,
        -6.13
        );
        pointLightCar.castShadow = true;
        this.scene.add(pointLightCar);

        const pointLighttscene = new THREE.PointLight(0xffffff, 5, 50);
        pointLighttscene.position.set(0, 10, 0);
        this.scene.add(pointLighttscene);

        const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        this.scene.add(hemisphereLight);

        loader.load("/models/nissan_370z.glb", (glb) => {
            const model = glb.scene;
            model.position.set(3.03, 1.84, -6.16)
            model.rotation.set(0.54, -0.58, 0)

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            // this.objControl = objController(model)
            this.scene.add(model)
        }, undefined, (error) => {
            console.error(error);
        });
        

        this.camera.position.set(3.22, 2.50, -6.81)
        this.camera.rotation.set(-2.80, -0.30, 2.99)
        // this.objControl = objController(this.camera)
    }
    
    update() {
        this.camera.rotation.set(-2.80, -0.30, 2.99)
        if (this.objControl) {
            this.objControl.update()
        }
    }
}

export default MatchRoom