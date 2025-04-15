import { GameState } from "../data/gameState";
import { ws, sendMessage } from "../network/websocket";
import GameMainMenuStrategy from "../strategies/game_main_menu_strategy";
import GameInRoomStrategy from "../strategies/game_in_room_strategy copy";

// Mapa de estratégias associadas aos estados do jogo
const strategies = {
    [GameState.MAIN_MENU]: GameMainMenuStrategy,
    [GameState.IN_ROOM]: GameInRoomStrategy,
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
        this.setState(GameState.IN_ROOM);
    }

    setState(state) {
        if (this.state === state) return;

        this.state = state;
        this.game.status = state;
        this.ui.status = state;

        const strategy = strategies[state];

        if (strategy) {
            this.activeStateHandler = new strategy();
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