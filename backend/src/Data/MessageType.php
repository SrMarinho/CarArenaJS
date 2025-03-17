<?php

namespace App\Enums;

enum MessageType: string {
    case MATCH_MESSAGE = 'match';
    case PRIVATE_MESSAGE = 'private';
}