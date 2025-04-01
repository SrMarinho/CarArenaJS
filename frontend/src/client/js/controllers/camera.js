import * as THREE from 'three';
import { keys } from '../core/keyboard.js';

export function setupCameraControls(camera) {
    const moveSpeed = 0.02;
    const rotateSpeed = 0.02;

    function update() {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        const perpendicular = new THREE.Vector3();
        perpendicular.crossVectors(camera.up, direction).normalize();

        if (keys['w']) {
            camera.position.addScaledVector(direction, moveSpeed);
        }
        if (keys['s']) {
            camera.position.addScaledVector(direction, -moveSpeed);
        }

        if (keys['a']) {
            camera.position.addScaledVector(perpendicular, moveSpeed);
        }
        if (keys['d']) {
            camera.position.addScaledVector(perpendicular, -moveSpeed);
        }

        if (keys['q']) {
            camera.position.addScaledVector(camera.up, -moveSpeed);
        }
        if (keys['e']) { // Tecla E: Mover para cima
            camera.position.addScaledVector(camera.up, moveSpeed);
        }

        // Rotação da câmera
        if (keys['ArrowLeft']) {
            camera.rotation.y += rotateSpeed;
        }
        if (keys['ArrowRight']) {
            camera.rotation.y -= rotateSpeed;
        }
        // if (keys['ArrowUp']) { // Seta para cima: Rotacionar para cima
        //     camera.rotation.x += rotateSpeed;
        // }
        // if (keys['ArrowDown']) { // Seta para baixo: Rotacionar para baixo
        //     camera.rotation.x -= rotateSpeed;
        // }
    }

    return { update };
}