import GameStateStrategy from "./game_state_strategy";
import { GameState } from "../data/gameState";
import MainMenu from "../scenes/main_menu";

class GameMainMenuStrategy extends GameStateStrategy {
    constructor() {
        super();
        this.game = null;
        this.ui = null;
    }

    run() {
        this.ui.renderMainMenu();

        const mainMenu = new MainMenu(this.game.scene, this.game.camera);
        this.game.loadLevel(mainMenu);
    }

    handleEvent(event, data) {
        switch (event) {
            case "startGame":
                this.game.mediator.createMatch();
                break;
            case "exit":
                this.game.mediator.setState(GameState.EXIT);
                break;
            default:
                console.log(`Evento não reconhecido no menu: ${event}`);
        }
    }
}

export default GameMainMenuStrategy;