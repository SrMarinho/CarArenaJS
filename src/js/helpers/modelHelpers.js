import * as THREE from "three";

export function changeModelColor(model, color) {
    model.traverse((node) => {
        if (node.isMesh && node.material) {
            node.material.color.set(color);
            node.material.needsUpdate = true;
        }
    });
}

export function changeModelOpacity(model, opacity) {
    model.traverse((node) => {
        if (node.isMesh && node.material) {
            if (Array.isArray(node.material)) {
                node.material.forEach((material) => {
                    material.transparent = true;
                    material.opacity = opacity;
                    material.needsUpdate = true;
                    material.alphaTest = 0;
                    material.blending = THREE.NormalBlending;
                });
            } else {
                node.material.transparent = true;
                node.material.opacity = opacity;
                node.material.needsUpdate = true;
                node.material.alphaTest = 0;
                node.material.blending = THREE.NormalBlending;
            }
        }
    });
}

export function addModelToScene(scene, model, position, angle) {
    if (!model) return null;

    const modelClone = model.clone();
    modelClone.position.copy(position);
    modelClone.rotation.y = angle;
    modelClone.scale.set(0, 0, 0);
    scene.add(modelClone);
    return modelClone;
}