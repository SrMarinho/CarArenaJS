<?php
namespace App\Handlers;

use App\Interfaces\MessageHandlerInterface;
use Ratchet\ConnectionInterface;
use App\Services\GameMatchService;

class GameMatchMessageHandler implements MessageHandlerInterface {
    protected $matchService;

    public function __construct(GameMatchService $matchService)
    {
        $this->matchService = $matchService;
    }

    public function handle(ConnectionInterface $from, array $data): void
    {
        if (!isset($from->resourceId)) {
            return;
        }
        $playerId = $from->resourceId;
        $matchId = $this->matchService->getMatchIdByPlayer($playerId);

        if (!$matchId) {
            return;
        }

        // Lógica adicional para processar mensagens da partida
    }
}