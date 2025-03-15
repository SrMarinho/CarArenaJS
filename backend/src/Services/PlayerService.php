<?php
namespace App\Services;

use App\Models\Player;
use App\Core\PlayerManager;

class PlayerService {
    private $playerManager;

    public function __construct($playerManager) {
        $this->playerManager = $playerManager;
    }

    public function registerPlayer(Player $player) {
        $this->playerManager->addPlayer($player);
    }

    public function disconnectPlayer($playerId) {
        $this->playerManager->removePlayer($playerId);
    }

    public function getPlayer($playerId) {
        return $this->playerManager->getPlayer($playerId);
    }

    public function getAllPlayers() {
        return $this->playerManager->getAllPlayers();
    }

    public function sendMessageToPlayer($playerId, $message) {
        $player = $this->playerManager->getPlayer($playerId);
        if ($player) {
            $player->sendMessage($message);
        }
    }

    public function broadcastMessage($message) {
        foreach ($this->playerManager->getAllPlayers() as $player) {
            $player->sendMessage($message);
        }
    }
}