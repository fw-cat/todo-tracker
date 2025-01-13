<?php

namespace App\Enums;

enum MessageType: int
{
    case NONE   = 0;
    case NORMAL = 10;
    case SPARTA = 20;

    public function isEnabled(): bool
    {
        return $this !== self::NONE;
    }
}
