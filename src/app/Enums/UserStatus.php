<?php

namespace App\Enums;

enum UserStatus: int
{
    case PRE_REGISTER   = 0;
    case REGISTERD      = 1;
    case USE_STOP       = 2;
    case USER_DELETED   = 8;
    case SYSTEM_DELETED = 9;

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
