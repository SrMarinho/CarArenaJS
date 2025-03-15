<?php
namespace App\Core;

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use App\Core\ConnectionManager;
use App\Handlers\MessageHandler;
use App\Handlers\ErrorHandler;
use App\Services\PlayerService;
use App\Services\GameMatchService;
use App\Core\PlayerManager;
use App\Models\Player;

class GameServer implements MessageComponentInterface {
    protected $connectionManager;
    protected $messageHandler;
    protected $errorHandler;
    protected $playerService;
    protected $playerManager;
    protected $matchManager;
    protected $matchService;

    public function __construct() {
        $this->connectionManager = new ConnectionManager();
        $this->messageHandler = new MessageHandler($this->connectionManager);
        $this->errorHandler = new ErrorHandler();

        $this->playerManager = new PlayerManager();
        $this->matchManager = new GameMatchManager();

        $this->playerService = new PlayerService($this->playerManager);
        $this->matchService = new GameMatchService($this->matchManager);
    }

    public function onOpen(ConnectionInterface $conn) {
        // Adiciona a conexão ao gerenciador de conexões
        $this->connectionManager->addConnection($conn);

        // Cria um novo jogador e o registra
        $playerId = $conn->resourceId;
        $username = "Player_" . $playerId;
        $player = new Player($playerId, $username, $conn);
        $this->playerService->registerPlayer($player);

        // Notifica sobre a nova conexão
        echo "Novo jogador conectado: {$playerId} ({$username})\n";

        // Exemplo: Cria uma nova partida e adiciona o jogador
        $matchId = uniqid(); // Gera um ID único para a partida
        $this->matchService->createNewMatch($matchId);
        $this->matchService->addPlayerToMatch($matchId, $player);

        // Envia uma mensagem de boas-vindas ao jogador
        $conn->send("Bem-vindo ao jogo, {$username}! Você foi adicionado à partida {$matchId}.");
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        // Encaminha a mensagem para o MessageHandler
        $this->messageHandler->handle($from, $msg);
    }

    public function onClose(ConnectionInterface $conn) {
        // Remove a conexão do gerenciador de conexões
        $this->connectionManager->removeConnection($conn);

        // Remove o jogador do serviço de jogadores
        $playerId = $conn->resourceId;
        $this->playerService->disconnectPlayer($playerId);

        // Notifica sobre a desconexão
        echo "Jogador desconectado: {$playerId}\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        // Encaminha o erro para o ErrorHandler
        $this->errorHandler->handle($conn, $e);
    }
}