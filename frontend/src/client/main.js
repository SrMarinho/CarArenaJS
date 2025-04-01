import * as THREE from "three";
import Game from './js/core/game.js';
import UI from "./js/ui/interface.js";
import MainMenu from "./js/scenes/main_menu.js";
import GameMediator from "./js/mediators/game_mediator.js";


const main = async () => {
    const canvas = document.querySelector("#gameCanvas");
    const game = new Game(canvas)
    const ui = new UI() 

    const gameMediator = new GameMediator(game, ui)
    
    game.init()
}

window.addEventListener("load", main)