<?php

namespace App\Core;


use App\Models\GameMatch;

class GameMatchManager {
    private $matches = [];

    public function createMatch($matchId) {
        $this->matches[$matchId] = new GameMatch($matchId);
    }

    public function removeMatch($matchId) {
        if (isset($this->matches[$matchId])) {
            unset($this->matches[$matchId]);
        }
    }

    public function getMatch($matchId) {
        return $this->matches[$matchId] ?? null;
    }

    public function getAllMatches() {
        return $this->matches;
    }
}