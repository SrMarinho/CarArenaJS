import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadCar(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load("/CarHatchback.glb", function(gltf) {
            const car = gltf.scene;
            scene.add(car);
            car.scale.set(1, 1, 1);
            car.position.set(0, 0.2, 0);
            resolve(car);
        }, undefined, function(error) {
            reject(error);
        });
    });
}