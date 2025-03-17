<?php

namespace App\Enums;

enum GameMatchState: string
{
    // Antes da partida
    case WAITING = 'waiting';
    case LOBBY = 'lobby';
    case COUNTDOWN = 'countdown';
    case READY = 'ready';
    case MATCHMAKING = 'matchmaking';

    // Durante a partida
    case IN_PROGRESS = 'in_progress';
    case PAUSED = 'paused';
    case OVERTIME = 'overtime';
    case SUDDEN_DEATH = 'sudden_death';
    case INTERMISSION = 'intermission';

    // Depois da partida
    case FINISHED = 'finished';
    case CANCELLED = 'cancelled';
    case ABORTED = 'aborted';
    case REPLAY = 'replay';
    case RESULTS = 'results';
    case REMATCH = 'rematch';
}