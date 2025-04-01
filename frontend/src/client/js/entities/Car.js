import { GLTFLoader } from "three/examples/jsm/Addons.js";

class Car {
    static #instance = null;

    #onLoadCallback = null;
    #model = undefined;
    #isLoaded = false;

    constructor() {
        if (Car.#instance) {
            return Car.#instance;
        }
        this.path = "/models/CarHatchback.glb"
        Car.#instance = this;

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
            this.#model.position.y = 0.1;
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
        if (!Car.#instance) {
            Car.#instance = new Car();
        }
        return Car.#instance;
    }

    onLoad(callback) {
        this.#onLoadCallback = callback;
    }
}

export default Car