import { GameState } from "./data/gameState";

class UI {
    constructor() {
        this.gameUI = document.getElementById('gameUI');
        this.status = GameState.MAIN_MENU
        this.lastStatus = null

        this.update()
    }

    setMediator(mediator) {
        this.mediator = mediator
    }

    changeState(state, data = {}) {
        if (!this.mediator) return
        this.status = state
        this.mediator.notify(this, state, data)
        this.update()
    }

    update() {
        if (this.status === this.lastStatus) return

        this.gameUI.innerHTML = '';

        console.log(this.status);
        
        switch (this.status) {
            case GameState.MAIN_MENU:
                this.addButton(this.gameUI, 'Create Match', () => this.changeState(GameState.MATCH_CREATION));
                this.addButton(this.gameUI, 'Join Match', () => this.changeState(GameState.MATCH_JOIN));
                this.addButton(this.gameUI, 'Configurations', () => this.changeState(GameState.MATCH_JOIN));
                break;
            case GameState.MATCH_CREATION:
                this.addButton(this.gameUI, 'Enter Match Code', () => console.log('Entering match code...'));
                this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
                break;
            case GameState.IN_ROOM:
                this.addButton(this.gameUI, 'Enter Match Code', () => console.log('Entering match code...'));
                this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
                break;
            case GameState.JOIN_MATCH:
                this.addButton(this.gameUI, 'Enter Match Code', () => console.log('Entering match code...'));
                this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
                break;
            case GameState.LOBBY:
                this.addButton(this.gameUI, 'Ready Up', () => console.log('Player is ready!'));
                this.addButton(this.gameUI, 'Leave Lobby', () => this.changeState(GameState.MAIN_MENU));
                break;
            default:
                console.error('Estado do jogo desconhecido:');
        }
        this.lastStatus = this.status
    }

    createRoom() {

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