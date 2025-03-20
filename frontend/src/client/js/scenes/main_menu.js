import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { setupCameraControls } from "../controllers/cameraController.js";
import Car from '../objects/Car.js';
import Rock1 from '../objects/Rock1.js';
import { keys } from '../keyboard.js';

class MainMenu {
    constructor(scene, camera) {
        this.scene = scene
        this.camera = camera
        this.originalObjs = {}
        this.objs = {}
    }

    setup() {
        const loader = new GLTFLoader()
        const floorGeometry = new THREE.PlaneGeometry(100, 100)
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x7FB800,
            side: THREE.DoubleSide
        })
        
        const floor = new THREE.Mesh(floorGeometry, floorMaterial)
        floor.rotation.set(Math.PI / 2, 0, 0)
        // this.scene.add(floor)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1).normalize();
        this.scene.add(directionalLight);       

        // this.cameraControl = setupCameraControls(this.camera)
        
        // this.loadCar()
        // this.loadRock1()

        loader.load("/models/Low-poly landscape.glb", (glb) => {
            console.log(glb);
            
            const fence = glb.scene;
            // fence.scale.set(0.1, 0.1, 0.1);
            this.camera.lookAt(fence.position)

            this.scene.add(fence);
        }, undefined, (error) => {
            console.error(error);
        });

        loader.load("/models/CarHatchback.glb", (glb) => {
            const model = glb.scene;
            // fence.scale.set(0.1, 0.1, 0.1);

            // this.originalObjs.car = model
            // this.objs.car = this.originalObjs.car.clone()
            // model.rotation.y = Math.PI - Math.PI / 1.5
            // this.objs.car.rotation.y = Math.PI
            model.position.set(3, 2, -6.8)
            this.scene.add(model)
        }, undefined, (error) => {
            console.error(error);
        });
        
        // this.camera.position.z = -0.7
        // this.camera.position.y = 10
        // this.camera.position.x = 0.2

        this.camera.position.set(3.83, 2.05, -6.56)
        // this.camera.position.z = -1
        // this.camera.position.y = 1
        // this.camera.position.x = 1
    }
    
    update() {
        if (this.cameraControl) {
            this.cameraControl.update()
        }
    }
    
    loadCar() {
        const car = Car.getInstance()
        
        car.onLoad((model) => {
            this.originalObjs.car = model
            this.objs.car = this.originalObjs.car.clone()
            // model.rotation.y = Math.PI - Math.PI / 1.5
            this.objs.car.rotation.y = Math.PI
            this.scene.add(this.objs.car)
        })
    }

    loadRock1() {
        const rock1 = Rock1.getInstance()
        
        rock1.onLoad((model) => {
            // model.position = new THREE.Vector3(0, 0, 0)
            model.rotation.x = 0
            model.rotation.y = 0
            model.rotation.z = 0

            model.position.x = 0
            model.position.y = 0
            model.position.z = 0
            // model.scale.set(new THREE.Vector3(2, 2, 2))
            
            // console.log(model.position);
            
            this.camera.lookAt(new THREE.Vector3(0, 0, 0))
            this.camera.position.x = -1

            this.originalObjs.rock1 = model
            this.objs.rock1 = this.originalObjs.rock1.clone()
            
            console.log(model);
            
            this.scene.add(this.objs.rock1)
        })
    }

    menuOptions() {
        
    }
}

export default MainMenu