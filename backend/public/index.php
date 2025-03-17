<?php
require __DIR__ . '/../vendor/autoload.php';

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use App\Core\ConnectionManager;
use App\Handlers\MessageHandler;
use App\Handlers\ErrorHandler;
use App\Services\PlayerService;
use App\Services\GameMatchService;
use App\Core\GameServer;
use App\Core\PlayerManager;
use App\Core\GameMatchManager;

$config = require __DIR__ . '/../config/server.php';

$connectionManager = new ConnectionManager();
$messageHandler = new MessageHandler($connectionManager);
$errorHandler = new ErrorHandler();

$playerManager = new PlayerManager();
$playerService = new PlayerService($playerManager);

$matchManager = new GameMatchManager();
$matchService = new GameMatchService($matchManager);

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new GameServer(
                $connectionManager,
                $messageHandler,
                $errorHandler,
                $playerService,
                $matchService
            )
        )
    ),
    $config['port']
);

echo "Servidor WebSocket rodando na porta {$config['port']}...\n";
$server->run();