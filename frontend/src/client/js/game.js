import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GameState } from "./data/gameState";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.currentLevel = null;
        // this.status = GameState.MAIN_MENU

        // this.controls = new THREE.OrbitControls(this.camera, this.canvas);
        window.addEventListener('resize', () => this.resize(canvas));
    }

    init() {}

    loadLevel(level) {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        // Carrega o novo nível
        this.currentLevel = level;
        level.setup(); 
    }

    render() {
        requestAnimationFrame(() => this.render());

        // this.controls.update();
        this.currentLevel.update()

        this.renderer.render(this.scene, this.camera);
    }

    resize(canvas) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}

export default Game