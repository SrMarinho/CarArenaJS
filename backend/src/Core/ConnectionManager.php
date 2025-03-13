<?php
namespace App\Core;

use Ratchet\ConnectionInterface;
use SplObjectStorage;

class ConnectionManager {
    protected $clients;

    public function __construct() {
        $this->clients = new SplObjectStorage;
    }

    public function addConnection(ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function removeConnection(ConnectionInterface $conn) {
        $this->clients->detach($conn);
    }

    public function getConnections() {
        return $this->clients;
    }
}