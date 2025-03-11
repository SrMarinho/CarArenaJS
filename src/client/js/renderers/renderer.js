import * as THREE from 'three';

/**
 * Configura e retorna o renderizador WebGL.
 * @param {HTMLCanvasElement} canvas - O elemento canvas onde a cena será renderizada.
 * @returns {THREE.WebGLRenderer} - O renderizador configurado.
 */
export function setupRenderer(canvas) {
    // Cria o renderizador WebGL
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas, // Associa o renderizador ao canvas
        antialias: true, // Habilita antialiasing para suavizar as bordas
        alpha: true, // Permite fundo transparente (opcional)
    });

    // Configura o tamanho do renderizador para corresponder ao tamanho do canvas
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Configurações adicionais (opcional)
    renderer.setPixelRatio(window.devicePixelRatio); // Ajusta para telas de alta densidade (retina)
    renderer.shadowMap.enabled = true; // Habilita sombras (se necessário)
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Melhora a qualidade das sombras

    // Adiciona o renderizador ao DOM (caso o canvas não tenha sido passado)
    // document.body.appendChild(renderer.domElement);

    return renderer;
}

/**
 * Atualiza o tamanho do renderizador quando a janela é redimensionada.
 * @param {THREE.WebGLRenderer} renderer - O renderizador a ser redimensionado.
 * @param {THREE.PerspectiveCamera} camera - A câmera para ajustar o aspect ratio.
 */
export function handleResize(renderer, camera) {
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Atualiza o tamanho do renderizador
        renderer.setSize(width, height);

        // Atualiza o aspect ratio da câmera
        if (camera instanceof THREE.PerspectiveCamera) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    });
}