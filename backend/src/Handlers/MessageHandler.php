<?php
namespace App\Handlers;

use Ratchet\ConnectionInterface;
use App\Core\ConnectionManager;

class MessageHandler {
    protected $connectionManager;

    public function __construct(ConnectionManager $connectionManager) {
        $this->connectionManager = $connectionManager;
    }

    public function handle(ConnectionInterface $from, $msg) {
        foreach ($this->connectionManager->getConnections() as $client) {
            if ($client !== $from) {
                $client->send($msg); // Envia a mensagem para todos os outros clientes
            }
        }
    }
}