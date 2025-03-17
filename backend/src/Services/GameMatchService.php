<?php

namespace App\Services;

use App\Core\GameMatchManager;
use App\Models\GameMatch;

class GameMatchService {
    private $matchManager;

    public function __construct(GameMatchManager $matchManager) {
        $this->matchManager = $matchManager;
    }

    public function createNewMatch($matchId): void {
        $this->matchManager->createMatch($matchId);
    }

    public function addPlayerToMatch($matchId, $player): void  {
        $match = $this->matchManager->getMatch($matchId);
        if ($match) {
            $match->addPlayer($player);
        }
    }

    public function startMatch($matchId) : void{
        $match = $this->matchManager->getMatch($matchId);
        if ($match) {
            $match->setStatus('started');
        }
    }
    
    public function getMatchIdByPlayer($playerID): mixed {
        $matchs = $this->matchManager->getAllMatches();
        foreach ($matchs as $matchID => $match) {	
            $players = $match->getPlayers();
            foreach ($players as $player) {
                if ($player->getId() == $playerID) {
                    return $matchID;
                }
            }
        }
        return null;
    }

    public function getMatch(int $matchId): GameMatch | null {
        return $this->matchManager->getMatch($matchId);
    }
}