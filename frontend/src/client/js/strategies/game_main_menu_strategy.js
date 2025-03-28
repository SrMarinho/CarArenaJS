import GameStateStrategy from "./game_state_strategy";

class GameMainMenuStrategy extends GameStateStrategy {
    constructor() {
        this.state = "MainMenu"
    }
    run() {}
}

export default GameMainMenuStrategy