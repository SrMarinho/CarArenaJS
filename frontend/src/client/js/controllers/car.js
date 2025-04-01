import * as THREE from 'three';
import { keys } from '../keyboard.js';


const moveSpeed = Math.random(); // Velocidade de movimento
const rotateSpeed = 0.05; // Velocidade de rotação

const moveForward = (car) => {
    const direction = new THREE.Vector3();
    car.getWorldDirection(direction);
    car.position.addScaledVector(direction, moveSpeed);
}

export function setupCarControls(car) {

    function update() {
        // Vetor de direção do carro (para onde ele está apontando)
        const direction = new THREE.Vector3();
        car.getWorldDirection(direction);
        
        moveForward(car)
        // Movimento para frente e para trás
        // if (keys['w']) { // Tecla W: Mover para frente
        //     car.position.addScaledVector(direction, moveSpeed);
        // }
        if (keys['s']) { // Tecla S: Mover para trás
            car.position.addScaledVector(direction, -moveSpeed);
        }

        // Rotação do carro
        if (keys['ArrowLeft']) { // Seta para esquerda: Rotacionar para a esquerda
            car.rotation.y += rotateSpeed;
        }
        car.rotation.y += rotateSpeed;
        if (keys['ArrowRight']) { // Seta para direita: Rotacionar para a direita
            car.rotation.y -= rotateSpeed;
        }
    }

    return { update };
}