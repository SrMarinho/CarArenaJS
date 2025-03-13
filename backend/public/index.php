<?php
require __DIR__ . '/../vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Core\GameServer;

$config = require __DIR__ . '/../config/server.php';

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new GameServer()
        )
    ),
    $config['port']
);

echo "Servidor WebSocket rodando na porta {$config['port']}...\n";
$server->run();