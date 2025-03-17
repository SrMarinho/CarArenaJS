<?php

namespace App\Factories;

use App\Interfaces\MessageHandlerInterface;
use App\Handlers\GameMatchMessageHandler;
use App\Handlers\CreateGameMatchHandler;
use InvalidArgumentException;

class MessageHandlerFactory {
    public static function getHandler(string $type, array $params = []): MessageHandlerInterface {
        $handlers = [
            'createMatch' => CreateGameMatchHandler::class,
            'match' => GameMatchMessageHandler::class,
        ];

        if (!isset($handlers[$type])) {
            throw new InvalidArgumentException("Tipo de mensagem desconhecida: $type", 1);
        }

        $handlerClass = $handlers[$type];
        return new $handlerClass(...(new self)->resolveParameters($handlerClass, $params));
    }
    private static function resolveParameters(string $handlerClass, array $params): array {
        return $params;
    }
}