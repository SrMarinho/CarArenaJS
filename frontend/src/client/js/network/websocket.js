export const socketUrl = 'ws://127.0.0.1:8081';
const TRY_RECONNECT_TIME = 300000

export let socket = new WebSocket(socketUrl);

export const sendMessage = (data) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(data);
    } else {
        console.log("Socket não conectado");
    }
};

const reconnect = () => {
    console.log("Tentando reconectar...");
    socket = new WebSocket(socketUrl);

    socket.onopen = onOpen;
    socket.onerror = onError;
    socket.onclose = onClose;
};

const onOpen = () => {
    console.log("Conexão WebSocket estabelecida.");
};

const onError = (error) => {
    console.log("Erro na conexão WebSocket:", error);
    setTimeout(reconnect, TRY_RECONNECT_TIME);
};

const onClose = () => {
    console.log("Conexão WebSocket fechada.");
    setTimeout(reconnect, TRY_RECONNECT_TIME);
};

socket.onopen = onOpen;
socket.onerror = onError;
socket.onclose = onClose;

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


// socket.onclose = function (event) {
//     console.log('Conexão WebSocket fechada');
// };


// export function sendMessage(message) {
//     socket.send(message);
// }