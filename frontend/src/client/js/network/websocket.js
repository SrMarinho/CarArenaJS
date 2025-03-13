export const socketUrl = 'ws://127.0.0.1:8081';

export const socket = new WebSocket(socketUrl);

socket.onopen = function (event) {
    socket.send('Olá, servidor!');
};

socket.onmessage = function (event) {
    console.log('Mensagem recebida do servidor:', event.data);
};

socket.onerror = function (error) {
    console.error('Erro no WebSocket:', error);
};

socket.onclose = function (event) {
    console.log('Conexão WebSocket fechada');
};

export function sendMessage() {
    socket.send(message);
}