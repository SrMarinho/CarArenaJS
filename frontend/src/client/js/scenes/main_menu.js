import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { setupCameraControls } from "../controllers/camera.js";
import Car from '../entities/Car.js';
import Rock1 from '../entities/Rock1.js';
import { keys } from '../core/keyboard.js';
import { objController } from '../controllers/obj.js';

class MainMenu {
    constructor(scene, camera) {
        this.scene = scene
        this.camera = camera
        this.originalObjs = {}
        this.objs = {}
    }


    setup() {
        const loader = new GLTFLoader()

        this.scene.background = new THREE.Color( 0x00A6ED )

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

        loader.load("/models/Low-poly landscape.glb", (glb) => {
            const model = glb.scene;
            this.camera.lookAt(model.position)
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            this.scene.add(model);
        }, undefined, (error) => {
            console.error(error);
        });

        loader.load("/models/CarHatchback.glb", (glb) => {
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
        

        const clouds = new THREE.Group();

        // Nuvem 1 (grande)
        const cloud1 = this.createLowPolyCloud(
            new THREE.Vector3(-10, 15, -20), // posição x, y, z
            1.5 // escala
        );
        // clouds.add(cloud1);

        // Nuvem 2 (média)
        const cloud2 = this.createLowPolyCloud(
            new THREE.Vector3(-0.58, 9.79, 14.79),
            0.8
        );
        // this.objControl = objController(cloud2)
        clouds.add(cloud2);

        // Nuvem 3 (pequena)
        const cloud3 = this.createLowPolyCloud(
            new THREE.Vector3(15, 10, -15),
            0.8
        );
        // clouds.add(cloud3);

        this.scene.add(clouds);

        this.camera.position.set(3.22, 2.50, -6.81)
        this.camera.rotation.set(-2.80, -0.30, 2.99)
        this.objControl = objController(this.camera)
    }
    
    update() {
        // this.camera.rotation.set(-2.80, -0.30, 2.99)
        if (this.objControl) {
            this.objControl.update()
        }
    }

    createLowPolyCloud(position = new THREE.Vector3(0, 0, 0), scale = 1) {
        const cloudGroup = new THREE.Group();
        
        // Configurações base
        const cloudColor = 0xffffff;
        const cloudMaterial = new THREE.MeshPhongMaterial({
            color: cloudColor,
            transparent: true,
            opacity: 0.9,
            flatShading: true
        });

        // Partes da nuvem (esferas combinadas)
        const cloudParts = [
            { size: 2, pos: [0, 0, 0] },
            { size: 1.5, pos: [1.5, 0.8, -0.5] },
            { size: 1.3, pos: [-1.2, 0.6, 0.3] },
            { size: 1, pos: [0.5, -0.4, 1] },
            { size: 0.8, pos: [-1, -0.3, -0.7] }
        ];

        // Criar cada parte da nuvem
        cloudParts.forEach(part => {
            const geometry = new THREE.SphereGeometry(
                part.size * 0.5, 
                Math.floor(8 * scale), // Reduz detalhes para low poly
                Math.floor(6 * scale)
            );
            
            const mesh = new THREE.Mesh(geometry, cloudMaterial);
            mesh.position.set(...part.pos);
            cloudGroup.add(mesh);
        });

        cloudGroup.position.copy(position);
        cloudGroup.scale.set(scale, scale, scale);
        cloudGroup.castShadow = true;
        cloudGroup.receiveShadow = true;

        return cloudGroup;
    }
}

export default MainMenu