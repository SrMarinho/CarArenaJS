
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadRock(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load("/Rock1.glb", function(gltf) {
            const rock = gltf.scene;
            scene.add(rock);
            // car.scale.set(1, 1, 1);
            // car.position.set(0, 0.2, 0);
            resolve(rock);
        }, undefined, function(error) {
            reject(error);
        });
    });
}