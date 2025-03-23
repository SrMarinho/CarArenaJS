import { GameState } from "./data/gameState";

class UI {
    constructor(game) {
        this.game = game
        this.game.setUI(this)
        this.lastStatus = null
    }

    changeGameState(newState) {
        this.game.status = newState;
    }

    getCurrentGameState() {
        return this.game.status;
    }

    update() {
        if (this.game.status === this.lastStatus) return

        const mainMenuButton = document.getElementById('mainMenuButton');
        mainMenuButton.innerHTML = '';

        switch (this.game.status) {
            case GameState.MAIN_MENU:
                this.addButton(mainMenuButton, 'Create Match', () => this.changeGameState(GameState.IN_ROOM));
                this.addButton(mainMenuButton, 'Join Match', () => this.changeGameState(GameState.MATCH_JOIN));
                this.addButton(mainMenuButton, 'Configurations', () => this.changeGameState(GameState.MATCH_JOIN));
                break;
            case GameState.MATCH_JOIN:
                this.addButton(mainMenuButton, 'Enter Match Code', () => console.log('Entering match code...'));
                this.addButton(mainMenuButton, 'Back to Main Menu', () => this.changeGameState(GameState.MAIN_MENU));
                break;
            case GameState.IN_ROOM:
                this.addButton(mainMenuButton, 'Start Game', () => console.log('Starting game...'));
                this.addButton(mainMenuButton, 'Leave Room', () => this.changeGameState(GameState.MAIN_MENU));
                // const level = new MatchRoom(game.scene, game.camera)
                // game.loadLevel(level)
                break;
            case GameState.LOBBY:
                this.addButton(mainMenuButton, 'Ready Up', () => console.log('Player is ready!'));
                this.addButton(mainMenuButton, 'Leave Lobby', () => this.changeGameState(GameState.MAIN_MENU));
                break;
            case GameState.MATCHMAKING:
                this.addButton(mainMenuButton, 'Cancel Matchmaking', () => this.changeGameState(GameState.MAIN_MENU));
                break;
            default:
                console.error('Estado do jogo desconhecido:', currentGameState);
        }
        this.lastStatus = this.game.status
    }

    addButton(container, text, onClick) {
        const button = document.createElement('button');
        button.className = 'btnMenuOption';
        button.textContent = text;
        button.addEventListener('click', onClick);
        container.appendChild(button);
    }
}

export default UI