<?php
namespace App\Core;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use App\Core\ConnectionManager;
use App\Models\Player;
use App\Factories\MessageHandlerFactory;

class GameServer implements MessageComponentInterface
{
    protected $connectionManager;
    protected $messageHandler;
    protected $errorHandler;
    protected $playerManager;
    public $playerService;
    protected $matchManager;
    public $matchService;

    public function __construct(
        ConnectionManager $connectionManager,
        $messageHandler,
        $errorHandler,
        $playerService,
        $matchService
    ) {
        $this->connectionManager = $connectionManager;
        $this->messageHandler = $messageHandler;
        $this->errorHandler = $errorHandler;

        $this->playerService = $playerService;
        $this->matchService = $matchService;
    }

    public function onOpen(ConnectionInterface $conn): void
    {
        $this->connectionManager->addConnection($conn);

        $playerId = $conn->resourceId;
        $username = "Player_" . $playerId;
        $player = new Player($playerId, $username, $conn);

        $this->playerService->registerPlayer($player);

        echo "Novo jogador conectado: {$playerId} ({$username})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg): void
    {
        $data = json_decode($msg, true);

        if (!isset($data['type'])) {
            return;
        }

        try {
            $messageHandler = MessageHandlerFactory::getHandler(
                $data['type'], 
                $this
            );
            $messageHandler->handle($from, $data);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function onClose(ConnectionInterface $conn): void
    {
        $playerId = $conn->resourceId;
        $this->playerService->disconnectPlayer($playerId);
        $this->connectionManager->removeConnection($conn);

        echo "Jogador desconectado: {$playerId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        $this->errorHandler->handle($conn, $e);
    }
}