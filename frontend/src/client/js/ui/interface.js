import { GameState } from "../data/gameState";
import './pages/mainMenu';
import './pages/inRoom';

class UI {
    constructor() {
        this.gameUI = document.getElementById('gameUI');
        if (!this.gameUI) throw new Error("Elemento 'gameUI' não encontrado");
        this.mediator = null;
        this.status = null;
        this.lastStatus = null;

        this.changeState = this.changeState.bind(this);
        this.update = this.update.bind(this);

        this.update();
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    syncState(state) {
        if (this.status !== state) {
            this.status = state;
            this.update();
        }
    }

    update() {
        if (this.status === this.lastStatus) return;
        this.clear();
        switch (this.status) {
            case GameState.MAIN_MENU: this.renderMainMenu(); break;
            case GameState.IN_ROOM: this.renderInRoom(); break;
            case GameState.JOIN_MATCH: this.renderJoinMatch(); break;
            case GameState.LOBBY: this.renderLobby(); break;
            case GameState.CONFIGURATIONS: this.renderConfigurations(); break;
            default: this.renderUnknownState();
        }
        this.lastStatus = this.status;
    }

    changeState(state, data = {}) {
        this.status = state;
        if (this.mediator) {
            this.mediator.notify("ui", state, data);
        }
        this.update();
    }

    renderMainMenu() {
        const page = document.createElement('main-menu');
        page.changeState = this.changeState
        
        this.gameUI.appendChild(page);
    }

    renderInRoom(data = {}) {
        const page = document.createElement('in-room');
        page.changeState = this.changeState
        
        this.gameUI.appendChild(page);
    }

    renderJoinMatch() {
        this.clear()
        const matchCodeInput = this.addInput(this.gameUI, 'Match Code', 'text', 'Digite o código da partida');
        this.addButton(this.gameUI, 'Join', () => this.handleJoinMatch(matchCodeInput.value));
        this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
    }

    renderLobby() {
        this.clear()
        this.addButton(this.gameUI, 'Ready Up', () => this.mediator.notify("ui", "playerReady"));
        this.addButton(this.gameUI, 'Leave Lobby', () => this.changeState(GameState.MAIN_MENU));
    }

    renderConfigurations() {
        this.clear()
        const nameInput = this.addInput(this.gameUI, 'Player Name', 'text', 'Seu nome');
        this.addButton(this.gameUI, 'Save Settings', () => this.mediator.notify("ui", "saveSettings", { name: nameInput.value }));
        this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
    }

    renderUnknownState() {
        this.clear()
        this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
    }

    addButton(container, text, onClick) {
        const button = document.createElement('button');
        button.className = 'btnMenuOption';
        button.textContent = text;
        button.setAttribute('aria-label', text);
        button.addEventListener('click', onClick);
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') onClick();
        });
        container.appendChild(button);
        return button;
    }

    addInput(container, labelText, type, placeholder) {
        const label = document.createElement('label');
        label.textContent = labelText;
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.className = 'inputField';
        label.appendChild(input);
        container.appendChild(label);
        return input;
    }

    showMessage(message, duration = 3000) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = message;
        this.gameUI.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), duration);
    }

    handleJoinMatch(code) {
        if (!code) {
            this.showMessage("Por favor, insira um código de partida.");
            return;
        }
        this.showMessage("Conectando à partida...");
        this.mediator.notify("ui", "joinMatchWithCode", { code });
    }

    clear() {
        this.gameUI.innerHTML = '';
    }
}

export default UI;