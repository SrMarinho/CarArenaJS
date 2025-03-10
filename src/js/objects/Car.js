import { GLTFLoader } from "three/examples/jsm/Addons.js";

class Car {
    static #instance = null;

    #model = undefined;
    #isLoaded = false;

    constructor() {
        if (Car.#instance) {
            return Car.#instance;
        }

        Car.#instance = this; // Armazena a instância única

        // Inicia o carregamento do modelo automaticamente
        this.#init();
    }

    async #init() {
        if (this.#isLoaded) {
            console.log("O modelo já foi carregado.");
            return;
        }

        const loader = new GLTFLoader();

        try {
            const glb = await loader.loadAsync("/CarHatchback.glb"); // Carrega o modelo de forma assíncrona
            this.#model = glb.scene;
            this.#model.position.y = 0.1;
            this.#isLoaded = true; // Marca o modelo como carregado
            console.log("Modelo carregado com sucesso!");
        } catch (error) {
            console.error("Erro ao carregar o modelo:", error);
        }
    }

    getModel() {
        if (!this.#isLoaded) {
            console.warn("O modelo ainda não foi carregado.");
            return null;
        }
        return this.#model; // Retorna o modelo carregado
    }

    static getInstance() {
        if (!Car.#instance) {
            Car.#instance = new Car();
        }
        return Car.#instance;
    }
}