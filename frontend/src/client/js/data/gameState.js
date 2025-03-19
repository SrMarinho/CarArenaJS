export const GameState = Object.freeze({
    MAIN_MENU: "main_menu",
    MATCH_CREATION: "match_creation",
    MATCH_JOIN: "match_join",
    IN_ROOM: "in_room",
    LOBBY: "lobby",
    MATCHMAKING: "matchmaking",
});

let currentGameState = GameState.MAIN_MENU;

export function changeGameState(newState) {
    currentGameState = newState;
    updateUI();
}

// Função para obter o estado atual do jogo
export function getCurrentGameState() {
    return currentGameState;
}

function updateUI() {
    const mainMenuButton = document.getElementById('mainMenuButton');
    mainMenuButton.innerHTML = '';

    switch (currentGameState) {
        case GameState.MAIN_MENU:
            addButton(mainMenuButton, 'Create Match', () => changeGameState(GameState.MATCH_CREATION));
            addButton(mainMenuButton, 'Join Match', () => changeGameState(GameState.MATCH_JOIN));
            break;
        case GameState.MATCH_CREATION:
            addButton(mainMenuButton, 'Confirm Creation', () => console.log('Match created!'));
            addButton(mainMenuButton, 'Back to Main Menu', () => changeGameState(GameState.MAIN_MENU));
            break;
        case GameState.MATCH_JOIN:
            addButton(mainMenuButton, 'Enter Match Code', () => console.log('Entering match code...'));
            addButton(mainMenuButton, 'Back to Main Menu', () => changeGameState(GameState.MAIN_MENU));
            break;
        case GameState.IN_ROOM:
            addButton(mainMenuButton, 'Start Game', () => console.log('Starting game...'));
            addButton(mainMenuButton, 'Leave Room', () => changeGameState(GameState.MAIN_MENU));
            break;
        case GameState.LOBBY:
            addButton(mainMenuButton, 'Ready Up', () => console.log('Player is ready!'));
            addButton(mainMenuButton, 'Leave Lobby', () => changeGameState(GameState.MAIN_MENU));
            break;
        case GameState.MATCHMAKING:
            addButton(mainMenuButton, 'Cancel Matchmaking', () => changeGameState(GameState.MAIN_MENU));
            break;
        default:
            console.error('Estado do jogo desconhecido:', currentGameState);
    }
}

function addButton(container, text, onClick) {
    const button = document.createElement('button');
    button.className = 'btnMenuOption';
    button.textContent = text;
    button.addEventListener('click', onClick);
    container.appendChild(button);
}

updateUI();