<?php
namespace App\Handlers;

use App\Interfaces\MessageHandlerInterface;
use Ratchet\ConnectionInterface;
use App\Services\PlayerService;
use App\Services\GameMatchService;

class CreateGameMatchHandler implements MessageHandlerInterface {
    protected $playerService;
    protected $matchService;

    public function __construct(PlayerService $playerService, GameMatchService $matchService)
    {
        $this->playerService = $playerService;
        $this->matchService = $matchService;
    }

    public function handle(ConnectionInterface $from, array $data): void
    {
        print_r("player criando partida");
        if (!isset($from->resourceId)) {
            return;
        }
        $playerId = $from->resourceId;
        $player = $this->playerService->getPlayer($playerId);

        if (!$player) {
            return;
        }
        $matchId = 1;
        $this->matchService->createNewMatch($matchId);
        $this->matchService->addPlayerToMatch($matchId, $player);

        $match = $this->matchService->getMatch($matchId);

        if (!$match) {
            return;
        }

        $from->send(json_encode($match->toArray()));
    }
}