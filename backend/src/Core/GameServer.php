<?php
namespace App\Core;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use App\Core\ConnectionManager;
use App\Models\Player;

class GameServer implements MessageComponentInterface
{
    protected $connectionManager;
    protected $messageHandler;
    protected $errorHandler;
    protected $playerService;
    protected $playerManager;
    protected $matchManager;
    protected $matchService;

    private $matchId = 1;

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
        $this->connectionManager = $connectionManager;
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

        $matchId = 1;
        if (!$this->matchService->getMatch($matchId)) {
            $this->matchService->createNewMatch($matchId);
        }
        $this->matchService->addPlayerToMatch($matchId, $player);

        $data = [
            "type" => "playerJoined",
            "matchId" => $matchId,
            "player" => $player->toArray()
        ];

        $this->messageHandler->handle($conn, json_encode($data));

        // $welcomeMessage = [
        //     "msg" => "Bem-vindo ao jogo, {$username}! Você foi adicionado à partida {$matchId}."
        // ];
        // $conn->send(json_encode($welcomeMessage));
    }

    public function onMessage(ConnectionInterface $from, $msg): void
    {
        $data = json_decode($msg, true);
        $playerId = $from->resourceId;
        $player = $this->playerService->getPlayer($playerId);
        $data["id"] = $player->getId();
        $this->messageHandler->handle($from, json_encode($data));
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