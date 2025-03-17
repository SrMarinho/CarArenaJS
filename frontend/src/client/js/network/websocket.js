export const socketUrl = 'ws://127.0.0.1:8081';

export const socket = new WebSocket(socketUrl);

// socket.onopen = function (event) {
//     socket.send(JSON.stringify({
//         msg: 'Olá, servidor!'
//     }));
// };

// socket.onmessage = function (event) {
//     const data = JSON.parse(event.data)
//     switch (data.type) {
//         case "playerJoined":
//             playerJoined(data)
//             break;
//         default:
//             break;
//     }
// };

// socket.onerror = function (error) {
//     console.error('Erro no WebSocket:', error);
// };

// socket.onclose = function (event) {
//     console.log('Conexão WebSocket fechada');
// };

export function sendMessage(message) {
    socket.send(message);
}