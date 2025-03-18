<?php

namespace App\Factories;

use App\Interfaces\MessageHandlerInterface;
use App\Handlers\GameMatchMessageHandler;
use App\Handlers\CreateGameMatchHandler;
use InvalidArgumentException;

class MessageHandlerFactory {
    public static function getHandler(string $type, $gameServer): MessageHandlerInterface {
        // Mapeia os tipos de mensagem para as classes de handlers correspondentes
        $handlers = [
            'createMatch' => CreateGameMatchHandler::class,
            'match' => GameMatchMessageHandler::class,
        ];

        // Verifica se o tipo de mensagem é válido
        if (!isset($handlers[$type])) {
            throw new InvalidArgumentException("Tipo de mensagem desconhecida: $type", 1);
        }

        // Obtém a classe do handler correspondente ao tipo de mensagem
        $handlerClass = $handlers[$type];

        // Processa os parâmetros com base no tipo de handler
        $processedParams = self::processParamsForHandler($type, $gameServer);

        // Cria uma instância do handler, passando os parâmetros processados
        return new $handlerClass(...$processedParams);
    }

    private static function processParamsForHandler(string $type, $gameServer): array {
        return match ($type) {
            'createMatch' => [
                "playerService" => $gameServer->playerService,
                "matchService" => $gameServer->matchService,
            ],
            'match' => [
                "matchService" => $gameServer->matchService,
            ],
            default => [],
        };
    }
}