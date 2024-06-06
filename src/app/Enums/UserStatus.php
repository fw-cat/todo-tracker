<?php

namespace App\Enums;

enum UserStatus: int
{
    case PRE_REGISTER   = 1;
    case REGISTERD      = 2;
    case USE_STOP       = 3;
    case USER_DELETED   = 8;
    case SYSTEM_DELETED = 9;

    /**
     * 利用可能かどうか
     * @return bool
     */
    public function isActive(): bool
    {
        return $this === self::PRE_REGISTER || $this === self::REGISTERD;
    }

    /**
     * ステータスのラベルを返す
     * @return string
     */
    public function getLabel(): string
    {
        return match($this) {
            self::PRE_REGISTER      => "仮登録",
            self::REGISTERD         => "本登録",
            self::USE_STOP          => "利用停止",
            self::USER_DELETED      => "退会",
            self::SYSTEM_DELETED    => "強制削除",
        };
    }
}
