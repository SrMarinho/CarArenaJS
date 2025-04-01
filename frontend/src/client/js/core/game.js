import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GameState } from "../data/gameState.js";
import { EffectComposer } from "three/examples/jsm/Addons.js";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { getLiteralCSSValue } from '../utils/utilsCSS.js'

class Game {
    constructor(canvas) {
        if (!canvas) {
            console.error("Canvas element not found!");
            return;
        }
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(90, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.composer = new EffectComposer(this.renderer);
        this.currentLevel = null;
        this.status = GameState.MAIN_MENU;

        window.addEventListener('resize', this.resize.bind(this));

        this.resize()
        // this.controls = new OrbitControls(this.camera, this.canvas);
    }

    init() {
        this.render();
    }

    loadLevel(level) {
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        this.currentLevel = level;
        level.setup();

        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight), // Resolução
            0.18, // Força do glow
            1, // Raio do glow
            0.02 // Limiar (threshold)
        );
        this.composer.addPass(bloomPass);

    }

    render() {
        requestAnimationFrame(() => this.render());

        // if (this.controls) this.controls.update();
        if (this.currentLevel) this.currentLevel.update();

        this.composer.render();
    }

    resize() {
        let elementID
        try {
            elementID = this.canvas.getAttribute('id')
        } catch (error) {
            return
        }

        if (!elementID) return

        elementID = "#" + elementID

        const width = getLiteralCSSValue(elementID, "width")
        const height = getLiteralCSSValue(elementID, "height")

        this.canvas.style.width = width;
        this.canvas.style.height = height;

        let canvasWidth = this.canvas.clientWidth
        let canvasHeight = this.canvas.clientHeight

        this.renderer.setSize(canvasWidth, canvasHeight, false);
        this.composer.setSize(canvasWidth, canvasHeight);

        this.camera.aspect = canvasWidth / canvasHeight;
        this.camera.updateProjectionMatrix();
    }

    setMediator(mediator) {
        this.mediator = mediator
    }
}

export default Game;