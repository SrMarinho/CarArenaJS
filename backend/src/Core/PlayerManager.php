<?php

namespace App\Core;

use App\Models\Player;

class PlayerManager {
    private $players = [];

    public function addPlayer(Player $player) {
        $this->players[$player->getId()] = $player;
    }

    public function removePlayer($playerId) {
        if (isset($this->players[$playerId])) {
            unset($this->players[$playerId]);
        }
    }

    public function getPlayer($playerId) {
        return $this->players[$playerId] ?? null;
    }

    public function getAllPlayers() {
        return $this->players;
    }
}