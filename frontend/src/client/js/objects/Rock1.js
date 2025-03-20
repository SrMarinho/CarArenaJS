import { GLTFLoader } from "three/examples/jsm/Addons.js";

class Rock1 {
    static #instance = null;

    #onLoadCallback = null;
    #model = undefined;
    #isLoaded = false;

    constructor() {
        if (Rock1.#instance) {
            return Rock1.#instance;
        }
        this.path = "/models/Rock1.glb"
        Rock1.#instance = this;

        this.#init();
    }

    async #init() {
        if (this.#isLoaded) {
            return;
        }

        const loader = new GLTFLoader();

        try {
            const glb = await loader.loadAsync(this.path);
            
            this.#model = glb.scene;
            // this.#model.position.y = 1;
            // this.#model.scale.y = 100;
            this.#isLoaded = true;

            if (this.#onLoadCallback) {
                this.#onLoadCallback(this.#model);
            }
        } catch (error) {
            console.error("Erro ao carregar o modelo:", error);
        }
    }

    getModel() {
        if (!this.#isLoaded) {
            return null;
        }
        console.log(this.#model);
        
        return this.#model;
    }

    static getInstance() {
        if (!Rock1.#instance) {
            Rock1.#instance = new Rock1();
        }
        return Rock1.#instance;
    }

    onLoad(callback) {
        this.#onLoadCallback = callback;
    }
}

export default Rock1