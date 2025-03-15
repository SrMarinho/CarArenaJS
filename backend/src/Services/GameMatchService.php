<?php

namespace App\Services;

use App\Core\GameMatchManager;
use App\Models\GameMatch;

class GameMatchService {
    private $matchManager;

    public function __construct(GameMatchManager $matchManager) {
        $this->matchManager = $matchManager;
    }

    public function createNewMatch($matchId) {
        $this->matchManager->createMatch($matchId);
    }

    public function addPlayerToMatch($matchId, $player) {
        $match = $this->matchManager->getMatch($matchId);
        if ($match) {
            $match->addPlayer($player);
        }
    }

    public function startMatch($matchId) {
        $match = $this->matchManager->getMatch($matchId);
        if ($match) {
            $match->setStatus('started');
        }
    }
}