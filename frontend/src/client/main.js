import * as THREE from "three";
import Game from './js/game.js';
import { setupLights } from './js/lights/lights.js';
import MainMenu from "./js/scenes/main_menu.js";
import { socket } from "./js/network/websocket.js";


const main = async () => {
    const btnCreateMatch = document.querySelector("mainMenuButton")
    const canvas = document.querySelector("#myCanvas");
    const game = new Game(canvas)

    const mainMenu = new MainMenu(game.scene, game.camera);

    game.loadLevel(mainMenu)

    game.scene.background = new THREE.Color( 0x00A6ED )

    game.init()
}

window.addEventListener("load", main)