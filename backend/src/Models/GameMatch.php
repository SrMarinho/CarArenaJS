<?php

namespace App\Models;

class GameMatch {
    private $id;
    private $players = [];
    private $status;

    public function __construct($id) {
        $this->id = $id;
        $this->status = 'waiting';
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
}