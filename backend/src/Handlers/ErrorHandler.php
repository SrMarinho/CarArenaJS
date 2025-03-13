<?php
namespace App\Handlers;

use Ratchet\ConnectionInterface;

class ErrorHandler {
    public function handle(ConnectionInterface $conn, \Exception $e) {
        echo "Erro: {$e->getMessage()}\n";
        $conn->close();
    }
}