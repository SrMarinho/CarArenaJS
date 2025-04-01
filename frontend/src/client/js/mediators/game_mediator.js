import { GameState } from "../data/gameState";
import { ws, sendMessage } from "../network/websocket";
import GameMainMenuStrategy from "../strategies/game_main_menu_strategy";

// Mapa de estratégias associadas aos estados do jogo
const strategies = {
    [GameState.MAIN_MENU]: () => new GameMainMenuStrategy(),
    // [GameState.IN_GAME]: () => new GameInGameStrategy(),
};

class GameMediator {
    constructor(game, ui) {
        this.game = game;
        this.ui = ui;
        this.activeStateHandler = null;
        this.state = null;
        this.setup();
    }

    setup() {
        this.game.setMediator(this);
        this.ui.setMediator(this);
        this.setState(GameState.MAIN_MENU);
    }

    setState(state) {
        if (this.state === state) return;

        this.state = state;
        this.game.status = state;
        this.ui.status = state;

        const strategyFactory = strategies[state];
        if (strategyFactory) {
            this.activeStateHandler = strategyFactory();
            this.activeStateHandler.game = this.game;
            this.activeStateHandler.ui = this.ui;
            this.activeStateHandler.run();
        } else {
            console.warn(`Nenhuma estratégia encontrada para o estado: ${state}`);
        }
    }

    notify(sender, event, data) {
        if (Object.values(GameState).includes(event)) {
            this.setState(event);
        } else {
            if (this.activeStateHandler && typeof this.activeStateHandler.handleEvent === "function") {
                this.activeStateHandler.handleEvent(event, data);
            }
        }
    }

    createMatch() {
        sendMessage({
            type: "createMatch",
        });
    }
}

export default GameMediator;