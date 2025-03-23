import * as THREE from "three";
import Game from './js/game.js';
import UI from "./js/ui.js";
import MainMenu from "./js/scenes/main_menu.js";
import GameMediator from "./js/mediators/game_mediator.js";


const main = async () => {
    const canvas = document.querySelector("#gameCanvas");
    const game = new Game(canvas)

    const mainMenu = new MainMenu(game.scene, game.camera);

    game.loadLevel(mainMenu)

    game.scene.background = new THREE.Color( 0x00A6ED )

    const ui = new UI() 

    const gameMediator = new GameMediator(game, ui)

    game.init()
}

window.addEventListener("load", main)