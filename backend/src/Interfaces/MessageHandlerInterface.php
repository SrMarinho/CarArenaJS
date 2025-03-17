<?php

namespace App\Interfaces;

use Ratchet\ConnectionInterface;

interface MessageHandlerInterface {
    public function handle(ConnectionInterface $conn, array $data): void;
}