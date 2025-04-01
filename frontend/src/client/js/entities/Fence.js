import { GLTFLoader } from "three/examples/jsm/Addons.js";

class Fence {
    static #instance = null; // Armazena a instância única

    #model = undefined; // Armazena o modelo 3D carregado
    #isLoaded = false; // Flag para verificar se o modelo já foi carregado

    constructor() {
        if (Fence.#instance) {
            return Fence.#instance;
        }

        Fence.#instance = this; // Armazena a instância única

        // Inicia o carregamento do modelo automaticamente
        this.#init();
    }

    async #init() {
        if (this.#isLoaded) {
            console.log("A cerca já foi carregada.");
            return;
        }

        const loader = new GLTFLoader();

        try {
            const glb = await loader.loadAsync("/Fence.glb"); // Carrega o modelo de forma assíncrona
            this.#model = glb.scene;
            this.#model.scale.set(0.1, 0.1, 0.1); // Ajusta a escala da cerca
            this.#isLoaded = true; // Marca o modelo como carregado
            console.log("Cerca carregada com sucesso!");
        } catch (error) {
            console.error("Erro ao carregar a cerca:", error);
        }
    }

    getModel() {
        if (!this.#isLoaded) {
            console.warn("A cerca ainda não foi carregada.");
            return null;
        }
        return this.#model; // Retorna o modelo carregado
    }

    static getInstance() {
        if (!Fence.#instance) {
            Fence.#instance = new Fence();
        }
        return Fence.#instance;
    }
}

export default Fence