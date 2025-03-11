import { gameState } from '../game/GameState.js';

export function setupSockets(io) {
    io.on('connection', (socket) => {
        console.log(`Jogador conectado: ${socket.id}`);

        // Adiciona o jogador ao estado do jogo
        gameState.addPlayer(socket.id);

        // Envia o estado inicial do jogo para o jogador
        socket.emit('initialState', gameState.getState());

        // Quando o jogador envia uma atualização de posição
        socket.on('updatePosition', (data) => {
            // Atualiza a posição do jogador no estado do jogo
            gameState.updatePlayerPosition(socket.id, data);

            // Envia o estado atualizado para todos os jogadores
            io.emit('gameState', gameState.getState());
        });

        // Quando o jogador se desconecta
        socket.on('disconnect', () => {
            console.log(`Jogador desconectado: ${socket.id}`);

            // Remove o jogador do estado do jogo
            gameState.removePlayer(socket.id);

            // Notifica todos os jogadores sobre a desconexão
            io.emit('gameState', gameState.getState());
        });
    });
}