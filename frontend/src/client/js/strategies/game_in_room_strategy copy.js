import GameStateStrategy from "./game_state_strategy";
import { GameState } from "../data/gameState";
import MainMenu from "../scenes/main_menu";
import { setupCameraControls } from "../controllers/camera";

class GameInRoomStrategy extends GameStateStrategy {
    constructor() {
        super();
        this.game = null;
        this.ui = null;
    }

    run() {
        this.ui.renderInRoom();

        const mainMenu = new MainMenu(this.game.scene, this.game.camera);
        this.game.loadLevel(mainMenu);

        const camera = this.game.camera
        camera.position.x += 1
        camera.position.z += 1

        camera.rotation.set(0, 2, 0, 'YXZ');
    }

    handleEvent(event, data) {
        switch (event) {
            case "startGame":
                // this.game.mediator.createMatch();
                break;
            case "exit":
                this.game.mediator.setState(GameState.EXIT);
                break;
            default:
                console.log(`Evento não reconhecido no menu: ${event}`);
        }
    }
}

export default GameInRoomStrategy;