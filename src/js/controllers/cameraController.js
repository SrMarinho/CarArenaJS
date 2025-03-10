import * as THREE from 'three';
import { keys } from '../keyboard.js';

export function setupCameraControls(camera) {
    const moveSpeed = 0.02; // Velocidade de movimento
    const rotateSpeed = 0.02; // Velocidade de rotação

    function update() {
        // Vetor de direção da câmera (para onde ela está olhando)
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        // Vetor perpendicular à direção da câmera (lateral)
        const perpendicular = new THREE.Vector3();
        perpendicular.crossVectors(camera.up, direction).normalize();

        // Movimento para frente e para trás
        if (keys['w']) { // Tecla W: Mover para frente
            camera.position.addScaledVector(direction, moveSpeed);
        }
        if (keys['s']) { // Tecla S: Mover para trás
            camera.position.addScaledVector(direction, -moveSpeed);
        }

        // Movimento para esquerda e direita (strafe)
        if (keys['a']) { // Tecla A: Mover para a esquerda
            camera.position.addScaledVector(perpendicular, moveSpeed);
        }
        if (keys['d']) { // Tecla D: Mover para a direita
            camera.position.addScaledVector(perpendicular, -moveSpeed);
        }

        // Movimento para cima e para baixo
        if (keys['q']) { // Tecla Q: Mover para baixo
            camera.position.addScaledVector(camera.up, -moveSpeed);
        }
        if (keys['e']) { // Tecla E: Mover para cima
            camera.position.addScaledVector(camera.up, moveSpeed);
        }

        // Rotação da câmera
        if (keys['ArrowLeft']) { // Seta para esquerda: Rotacionar para a esquerda
            camera.rotation.y += rotateSpeed;
        }
        if (keys['ArrowRight']) { // Seta para direita: Rotacionar para a direita
            camera.rotation.y -= rotateSpeed;
        }
        // if (keys['ArrowUp']) { // Seta para cima: Rotacionar para cima
        //     camera.rotation.x += rotateSpeed;
        // }
        // if (keys['ArrowDown']) { // Seta para baixo: Rotacionar para baixo
        //     camera.rotation.x -= rotateSpeed;
        // }
    }

    // Retorna a função update para ser usada no loop de animação
    return { update };
}