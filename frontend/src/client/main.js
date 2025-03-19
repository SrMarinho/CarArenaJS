import * as THREE from "three";
import Game from './js/game.js';
import { setupLights } from './js/lights/lights.js';
// import Level1 from './js/scenes/level1.js'
import MainMenu from "./js/scenes/main_menu.js";
import { socket, sendMessage } from "./js/network/websocket.js";


const main = async () => {
    const btnCreateMatch = document.querySelector("mainMenuButton")
    const canvas = document.querySelector("#myCanvas");

    const game = new Game(canvas)

    const mainMenu = new MainMenu(game.scene, game.camera);

    game.loadLevel(mainMenu)

    game.scene.background = new THREE.Color( 0x00A6ED )

    setupLights(game.scene);

    // game.camera.position.z = -1
    game.camera.position.y = 0.5
    game.camera.lookAt(new THREE.Vector3(1, 0, 1))

    game.render()
}

window.addEventListener("load", main)