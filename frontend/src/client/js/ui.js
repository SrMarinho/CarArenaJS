import { UIStates } from "./data/uiState";

class UI {
    constructor() {
        this.status = UIStates.MAIN_MENU
        this.lastStatus = null

        this.update()
    }

    setMediator(mediator) {
        this.mediator = mediator
    }

    changeUIStates(state, data = {}) {
        if (!this.mediator) return
        this.status = state
        this.mediator.notify(this, state, data)
        this.update()
    }

    update() {
        if (this.status === this.lastStatus) return

        const gameUI = document.getElementById('gameUI');
        gameUI.innerHTML = '';

        switch (this.status) {
            case UIStates.MAIN_MENU:
                this.addButton(gameUI, 'Create Match', () => this.changeUIStates(UIStates.IN_ROOM));
                this.addButton(gameUI, 'Join Match', () => this.changeUIStates(UIStates.MATCH_JOIN));
                this.addButton(gameUI, 'Configurations', () => this.changeUIStates(UIStates.MATCH_JOIN));
                break;
            case UIStates.IN_ROOM:
                this.addButton(gameUI, 'Enter Match Code', () => console.log('Entering match code...'));
                this.addButton(gameUI, 'Back to Main Menu', () => this.changeUIStates(UIStates.MAIN_MENU));
                break;
            case UIStates.JOIN_MATCH:
                this.addButton(gameUI, 'Enter Match Code', () => console.log('Entering match code...'));
                this.addButton(gameUI, 'Back to Main Menu', () => this.changeUIStates(UIStates.MAIN_MENU));
                break;
            case UIStates.IN_ROOM:
                this.addButton(gameUI, 'Start Game', () => console.log('Starting game...'));
                this.addButton(gameUI, 'Leave Room', () => this.changeUIStates(UIStates.MAIN_MENU));
                // const level = new MatchRoom(game.scene, game.camera)
                // game.loadLevel(level)
                break;
            case UIStates.LOBBY:
                this.addButton(gameUI, 'Ready Up', () => console.log('Player is ready!'));
                this.addButton(gameUI, 'Leave Lobby', () => this.changeUIStates(UIStates.MAIN_MENU));
                break;
            default:
                console.error('Estado do jogo desconhecido:', currentUIStates);
        }
        this.lastStatus = this.status
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