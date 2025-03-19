import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { setupCameraControls } from "../controllers/cameraController.js";
import Car from '../objects/Car.js';

class MainMenu {
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
        
        // this.camera.position.z = 0
        // this.camera.position.x = 1.1
        this.camera.position.z = -0.7
        this.camera.position.x = 0.2

        // this.camera.position.y = 0.1
        // this.camera.position.z = -10
    }
    
    update() {
        if (this.car) {
        }
    }
    
    loadCar() {
        const car = Car.getInstance()
        
        car.onLoad((model) => {
            this.objs.car = model
            // model.rotation.y = Math.PI - Math.PI / 1.5
            model.rotation.y = Math.PI
            this.scene.add(model)
        })
    }

    menuOptions() {
        
    }
}

export default MainMenu