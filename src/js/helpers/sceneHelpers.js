import * as THREE from "three";
import { addModelToScene, changeModelOpacity } from './modelHelpers.js';

export function animate(scene, camera, renderer, car, carControls, fence) {
    const radius = 1;
    const height = 1.2;
    const targetCameraPosition = new THREE.Vector3();
    const smoothness = 0.1;
    let lastFenceTime = 0;
    const fenceInterval = 50;
    let fences = [];
    const targetScale = new THREE.Vector3(0.1, 0.1, 0.1);
    const scaleSmoothness = 0.01;
    const fenceLifetime = 6000;

    function addFence(position, rotation) {
        const newFence = addModelToScene(scene, fence, position, rotation);
        changeModelOpacity(newFence, 1);
        if (newFence) {
            fences.push({
                fence: newFence,
                created_at: performance.now()
            });
        }
    }

    function render() {
        requestAnimationFrame(render);

        const currentTime = Date.now();
        if (car) {
            carControls.update();

            let cameraAngle = -car.rotation.y - (Math.PI / 2);
            targetCameraPosition.x = car.position.x + radius * Math.cos(cameraAngle);
            targetCameraPosition.z = car.position.z + radius * Math.sin(cameraAngle);
            targetCameraPosition.y = car.position.y + height;

            camera.position.lerp(targetCameraPosition, smoothness);
            camera.lookAt(car.position.clone().add(new THREE.Vector3(0, 0.75, 0)));

            if (currentTime - lastFenceTime > fenceInterval) {
                addFence(car.position, car.rotation.y - Math.PI / 2);
                lastFenceTime = currentTime;
            }
        }

        fences.forEach((fence, index) => {
            fence.fence.scale.lerp(targetScale, scaleSmoothness);
            if (performance.now() - fence.created_at > fenceLifetime) {
                scene.remove(fence.fence);
                fences.splice(index, 1);
            }
        });

        renderer.render(scene, camera);
    }

    render();
}