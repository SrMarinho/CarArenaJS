import { GameState } from "../data/gameState"
import { ws, sendMessage } from "../network/websocket"

class GameMediator {
    constructor(game, ui) {
        this.game = game
        this.ui = ui
        this.setup()
    }

    setup() {
        this.game.setMediator(this)
        this.ui.setMediator(this)

        this.game.status = GameState.MAIN_MENU
        this.ui.status = GameState.MAIN_MENU
    }

    notify(sender, event, data) {
        switch (event) {
            case GameState.MAIN_MENU:
                this.game.status = GameState.MAIN_MENU
                break;
            case GameState.MATCH_CREATION:
                this.game.status = GameState.MATCH_CREATION
                this.createMatch()
                break;
            default:
                break;
        }
    }

    createMatch() {
        sendMessage({
           type: "createMatch "
        })
    }
}

export default GameMediator