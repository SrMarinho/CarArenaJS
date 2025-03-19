<?php

namespace App\Models;

use App\Data\GameMatchState;

class GameMatch {
    private $id;
    private $players = [];
    private $status;

    public function __construct($id) {
        $this->id = $id;
        $this->status = GameMatchState::WAITING;
    }

    public function getId() {
        return $this->id;
    }

    public function addPlayer($player) {
        $this->players[] = $player;
    }

    public function removePlayer($playerId) {
        $this->players = array_filter($this->players, function($player) use ($playerId) {
            return $player->getId() !== $playerId;
        });
    }

    public function getPlayers() {
        return $this->players;
    }

    public function setStatus($status) {
        $this->status = $status;
    }

    public function getStatus() {
        return $this->status;
    }

    public function toArray() {
        $match = [
            "id" => $this->id,
            "staus" => $this->status,
            "players" => []
        ];

        foreach ($this->players as $player) {
            $match['players'][] = $player->toArray();
        }

        return $match;
    }
}