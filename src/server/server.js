import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { setupSockets } from './sockets/gameSocket.js';
import { HOST, PORT } from './config.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

setupSockets(io);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});