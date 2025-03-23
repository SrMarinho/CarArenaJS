import { UIStates } from "../data/uiState"
import { GameState } from "../data/gameState"

class GameMediator {
    constructor(game, ui) {
        this.game = game
        this.ui = ui

        this.game.setMediator(this)
        this.ui.setMediator(this)
    }

    notify(sender, event, data) {
        switch (event) {
            case UIStates.MAIN_MENU:
                this.game.status = GameState.MAIN_MENU
                break;
            default:
                break;
        }
    }
}

export default GameMediator