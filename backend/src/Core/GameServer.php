<?php
namespace App\Core;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use App\Core\ConnectionManager;
use App\Handlers\MessageHandler;
use App\Handlers\ErrorHandler;

class GameServer implements MessageComponentInterface {
    protected $connectionManager;
    protected $messageHandler;
    protected $errorHandler;

    public function __construct() {
        $this->connectionManager = new ConnectionManager();
        $this->messageHandler = new MessageHandler($this->connectionManager);
        $this->errorHandler = new ErrorHandler();
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->connectionManager->addConnection($conn);
        echo "Novo jogador conectado: {$conn->resourceId}\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $this->messageHandler->handle($from, $msg);
    }

    public function onClose(ConnectionInterface $conn) {
        $this->connectionManager->removeConnection($conn);
        echo "Jogador desconectado: {$conn->resourceId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        $this->errorHandler->handle($conn, $e);
    }
}