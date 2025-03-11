import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadFence() {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load("/Fence.glb", function(gltf) {
            const fence = gltf.scene;
            fence.scale.set(0.1, 0.1, 0.1);
            fence.position.set(0, 0.2, 0);
            resolve(fence);
        }, undefined, function(error) {
            reject(error);
        });
    });
}