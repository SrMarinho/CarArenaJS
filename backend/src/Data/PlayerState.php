<?php

namespace App\Enums;

enum PlayerState : string 
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
}