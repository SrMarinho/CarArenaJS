import { GameState } from "../data/gameState";

class UI {
    constructor() {
        this.gameUI = document.getElementById('gameUI');
        if (!this.gameUI) throw new Error("Elemento 'gameUI' não encontrado");
        this.mediator = null;
        this.status = GameState.MAIN_MENU;
        this.lastStatus = null;
        this.update();
    }

    setMediator(mediator) {
        this.mediator = mediator;
    }

    changeState(state, data = {}) {
        if (!this.mediator) return;
        this.status = state;
        this.mediator.notify("ui", state, data);
        this.update();
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
            case GameState.MATCH_CREATION: this.renderMatchCreation(); break;
            case GameState.JOIN_MATCH: this.renderJoinMatch(); break;
            case GameState.IN_ROOM: this.renderInRoom(); break;
            case GameState.LOBBY: this.renderLobby(); break;
            case GameState.CONFIGURATIONS: this.renderConfigurations(); break;
            default: this.renderUnknownState();
        }
        this.lastStatus = this.status;
    }

    renderMainMenu() {
        this.clear()
        this.addButton(this.gameUI, 'Create Match', () => this.changeState(GameState.MATCH_CREATION));
        this.addButton(this.gameUI, 'Join Match', () => this.changeState(GameState.JOIN_MATCH));
        this.addButton(this.gameUI, 'Configurations', () => this.changeState(GameState.CONFIGURATIONS));
    }

    renderMatchCreation() {
        this.gameUI.innerHTML = "<h1>Criar Partida</h1>";
        this.addButton(this.gameUI, 'Confirm Creation', () => this.mediator.notify("ui", "createMatch"));
        this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
    }

    renderJoinMatch() {
        this.gameUI.innerHTML = "<h1>Entrar em Partida</h1>";
        const matchCodeInput = this.addInput(this.gameUI, 'Match Code', 'text', 'Digite o código da partida');
        this.addButton(this.gameUI, 'Join', () => this.handleJoinMatch(matchCodeInput.value));
        this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
    }

    renderInRoom(data = {}) {
        this.gameUI.innerHTML = `<h1>Sala da Partida - Código: ${data.roomCode || 'N/A'}</h1>`;
        this.addButton(this.gameUI, 'Start Match', () => this.mediator.notify("ui", "startMatch"));
        this.addButton(this.gameUI, 'Leave Room', () => this.changeState(GameState.MAIN_MENU));
    }

    renderLobby() {
        this.gameUI.innerHTML = "<h1>Lobby</h1>";
        this.addButton(this.gameUI, 'Ready Up', () => this.mediator.notify("ui", "playerReady"));
        this.addButton(this.gameUI, 'Leave Lobby', () => this.changeState(GameState.MAIN_MENU));
    }

    renderConfigurations() {
        this.gameUI.innerHTML = "<h1>Configurações</h1>";
        const nameInput = this.addInput(this.gameUI, 'Player Name', 'text', 'Seu nome');
        this.addButton(this.gameUI, 'Save Settings', () => this.mediator.notify("ui", "saveSettings", { name: nameInput.value }));
        this.addButton(this.gameUI, 'Back to Main Menu', () => this.changeState(GameState.MAIN_MENU));
    }

    renderUnknownState() {
        this.gameUI.innerHTML = "<h1>Estado Desconhecido</h1>";
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