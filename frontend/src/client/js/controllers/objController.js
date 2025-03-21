import * as THREE from 'three';
import { keys } from "../keyboard"

export function objController(obj) {
    const moveSpeed = 0.02;
    const rotateSpeed = 0.02;

    function update() {
        // Vetor de direção da câmera (para onde ela está olhando)
        const direction = new THREE.Vector3();
        obj.getWorldDirection(direction);

        // Vetor perpendicular à direção da câmera (lateral)
        const perpendicular = new THREE.Vector3();
        perpendicular.crossVectors(obj.up, direction).normalize();

        // Movimento para frente e para trás
        if (keys['w']) { // Tecla W: Mover para frente
            obj.position.addScaledVector(direction, moveSpeed);
        }
        if (keys['s']) { // Tecla S: Mover para trás
            obj.position.addScaledVector(direction, -moveSpeed);
        }

        // Movimento para esquerda e direita (strafe)
        if (keys['a']) { // Tecla A: Mover para a esquerda
            obj.position.addScaledVector(perpendicular, moveSpeed);
        }
        if (keys['d']) { // Tecla D: Mover para a direita
            obj.position.addScaledVector(perpendicular, -moveSpeed);
        }

        // Movimento para cima e para baixo
        if (keys['q']) { // Tecla Q: Mover para baixo
            obj.position.addScaledVector(obj.up, -moveSpeed);
        }
        if (keys['e']) { // Tecla E: Mover para cima
            obj.position.addScaledVector(obj.up, moveSpeed);
        }

        if (keys['ArrowLeft']) { // Seta para esquerda: Rotacionar para a esquerda
            obj.rotation.y += rotateSpeed;
        }
        if (keys['ArrowRight']) { // Seta para direita: Rotacionar para a direita
            obj.rotation.y -= rotateSpeed;
        }
        if (keys['ArrowUp']) { // Seta para cima: Rotacionar para cima
            obj.rotation.x += rotateSpeed;
        }
        if (keys['ArrowDown']) { // Seta para baixo: Rotacionar para baixo
            obj.rotation.x -= rotateSpeed;
        }
        console.log(obj.position, obj.rotation);
    }

    return { update };
}