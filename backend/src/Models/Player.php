<?php
namespace App\Models;

use Ratchet\ConnectionInterface;

class Player {
    private $id;
    private $username;
    private $connection;

    public function __construct($id, $username, ConnectionInterface $connection) {
        $this->id = $id;
        $this->username = $username;
        $this->connection = $connection;
    }

    public function getId() {
        return $this->id;
    }

    public function getUsername() {
        return $this->username;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function sendMessage($message) {
        $this->connection->send($message);
    }
}