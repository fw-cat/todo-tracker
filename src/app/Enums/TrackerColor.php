<?php

namespace App\Enums;

enum TrackerColor: int
{
    case INDIGO     = 1;
    case SKY_BULE   = 2;
    case PINK       = 3;
    case YELLOW     = 4;
    case GREEN      = 5;
    case RED        = 6;

    /**
     * カラー画像名を返す
     */
    public function getImage(): string
    {
        return match($this) {
            self::INDIGO    => "color-01.svg",
            self::SKY_BULE  => "color-02.svg",
            self::PINK      => "color-03.svg",
            self::YELLOW    => "color-04.svg",
            self::GREEN     => "color-05.svg",
            self::RED       => "color-06.svg",
        };
    }

     /**
     * カラー名を返す
     * @return string
     */
    public function getName(): string
    {
        return match($this) {
            self::INDIGO    => "藍色",
            self::SKY_BULE  => "空色",
            self::PINK      => "桃色",
            self::YELLOW    => "黄色",
            self::GREEN     => "緑色",
            self::RED       => "赤色",
        };
    }
}
