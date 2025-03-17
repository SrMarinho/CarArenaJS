<?php

namespace App\Core;


use App\Models\GameMatch;

class GameMatchManager {
    private $matches = [];

    public function createMatch($matchId): void {
        $this->matches[$matchId] = new GameMatch($matchId);
    }

    public function removeMatch($matchId): void {
        if (isset($this->matches[$matchId])) {
            unset($this->matches[$matchId]);
        }
    }

    public function getMatch($matchId): GameMatch | null {
        return $this->matches[$matchId] ?? null;
    }

    public function getAllMatches() : array {
        return $this->matches;
    }
}