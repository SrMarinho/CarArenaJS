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

        switch ($data['type']) {
            case 'createMatch':
                $this->handleCreateMatch($from, $data);
                break;

            case 'match':
                $this->handleMatchMessage($from, $data);
                break;

            case 'private':
                $this->handlePrivateMessage($from, $data);
                break;

            default:
                // Lógica para tipos de mensagem desconhecidos
                break;
        }

        try {
            $this->messageHandler->handle($from, $msg);
        } catch (\Throwable $th) {
            // Tratar exceção
        }
    }

    private function handleCreateMatch(ConnectionInterface $from, array $data): void
    {
        $playerId = $from->resourceId;
        $player = $this->playerManager->getPlayer($playerId);

        if (!$player) {
            return;
        }

        $this->playerService->registerPlayer($player);

        $matchId = 1; // Isso poderia ser gerado dinamicamente
        $this->matchService->createNewMatch($matchId);
        $this->matchService->addPlayerToMatch($matchId, $player);

        $match = $this->matchManager->getMatch($matchId);

        if (!$match) {
            return;
        }

        $from->send(json_encode($match->toArray()));
    }

    private function handleMatchMessage(ConnectionInterface $from, array $data): void
    {
        if (!isset($from->resourceId)) {
            return;
        }
        $playerId = $from->resourceId;
        $data['from'] = $playerId;

        $matchId = $this->matchService->getMatchIdByPlayer($playerId);

        if (!$matchId) {
            return;
        }

        // Lógica adicional para processar mensagens da partida
    }

    private function handlePrivateMessage(ConnectionInterface $from, array $data): void
    {
        // TODO: Implementar lógica de mensagens privadas
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