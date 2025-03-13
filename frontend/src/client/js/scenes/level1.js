import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { setupCameraControls } from "../controllers/cameraController.js"
import { setupCarControls } from "../controllers/carController.js"
import Car from '../objects/Car.js'
import Fence from '../objects/Fence.js'


class Level1 {
    constructor(scene, camera) {
        this.scene = scene
        this.camera = camera
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
        this.scene.add(floor)
        
        setupCameraControls(this.camera)
        
        this.loadCar()
        
        loader.load("/models/Fence.glb", (glb) => {
            this.fence = glb.scene
            this.fence.scale.set(0.1, 0.1, 0.1)

            this.scene.add(this.fence)
        }, undefined, (error) => {
            console.error(error);
        });
        
        this.camera.position.z = -1
        // this.camera.position.y = 0.1
        // this.camera.position.z = -10
    }
    
    update() {
        if (this.car) {
            this.cameraFollowCar()
            this.carControls.update()
        }
    }
    
    cameraFollowCar() {
        if (this.camera) {
            const radius = 1;
            const height = 2;
            const targetCameraPosition = new THREE.Vector3();
            const smoothness = 0.1;
            let cameraAngle = -this.car.rotation.y - (Math.PI / 2);
            targetCameraPosition.x = this.car.position.x + radius * Math.cos(cameraAngle);
            targetCameraPosition.z = this.car.position.z + radius * Math.sin(cameraAngle);
            targetCameraPosition.y = this.car.position.y + height;
            this.camera.position.lerp(targetCameraPosition, smoothness);
            this.camera.lookAt(this.car.position.clone().add(new THREE.Vector3(0, 0.75, 0)));
        }
    }
    
    createFence() {
        if (this.fence) {
            this.scene.add(this.fence)
        }
    }

    loadCar() {
        const car = Car.getInstance()
        
        car.onLoad((model) => {
            this.objs.car = model
            this.scene.add(model)
            this.carControls = setupCarControls(this.car)
        })
    }
}

export default Level1