<?php
namespace App\Handlers;

use Ratchet\ConnectionInterface;
use App\Core\ConnectionManager;

class MessageHandler {
    protected ConnectionManager $connectionManager;

    public function __construct(ConnectionManager $connectionManager) {
        $this->connectionManager = $connectionManager;
    }

    public function handle(ConnectionInterface $from, string $msg, array $toList) {
        foreach ($toList as $client) {
            $client->send($msg);
        }
    }
}