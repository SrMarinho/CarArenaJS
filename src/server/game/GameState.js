class GameState {
    constructor() {
        this.players = {}; // Armazena os jogadores por ID
    }

    // Adiciona um jogador ao estado
    addPlayer(playerId) {
        this.players[playerId] = {
            x: 0,
            y: 0,
            z: 0,
            rotation: 0
        };
    }

    // Remove um jogador do estado
    removePlayer(playerId) {
        delete this.players[playerId];
    }

    // Atualiza a posição de um jogador
    updatePlayerPosition(playerId, data) {
        if (this.players[playerId]) {
            this.players[playerId] = { ...this.players[playerId], ...data };
        }
    }

    // Retorna o estado atual do jogo
    getState() {
        return this.players;
    }
}

export const gameState = new GameState();