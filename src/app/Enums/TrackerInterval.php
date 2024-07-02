<?php

namespace App\Enums;

enum TrackerInterval: int
{
    // 毎日
    case DAILY      = 1;

    // 週◯
    case WEEKLEY_1  = 11;
    case WEEKLEY_2  = 12;
    case WEEKLEY_3  = 13;
    case WEEKLEY_4  = 14;
    case WEEKLEY_5  = 15;
    case WEEKLEY_6  = 16;

    // 隔週
    // case BIWEEKLEY  = 21;

    // 月◯
    // case MONTHLY_1  = 31;
    // case MONTHLY_2  = 32;
    // case MONTHLY_3  = 33;
    // case MONTHLY_4  = 34;
    // case MONTHLY_5  = 35;

    /**
     * 月次の最大数を返す
     */
    public function maxCount(): int
    {
        return match($this) {
            self::DAILY     => intval(date("t")),

            self::WEEKLEY_1 => 4,
            self::WEEKLEY_2 => 8,
            self::WEEKLEY_3 => 12,
            self::WEEKLEY_4 => 16,
            self::WEEKLEY_5 => 20,
            self::WEEKLEY_6 => 24,

            // self::BIWEEKLEY => "隔週",

            // self::MONTHLY_1 => "月一",
            // self::MONTHLY_2 => "月二",
            // self::MONTHLY_3 => "月三",
            // self::MONTHLY_4 => "月四",
            // self::MONTHLY_5 => "月五",
        };
    }

    /**
     * カラー名を返す
     * @return string
     */
    public function getName(): string
    {
        return match($this) {
            self::DAILY     => "毎日",

            self::WEEKLEY_1 => "週一",
            self::WEEKLEY_2 => "週二",
            self::WEEKLEY_3 => "週三",
            self::WEEKLEY_4 => "週四",
            self::WEEKLEY_5 => "週五",
            self::WEEKLEY_6 => "週六",

            // self::BIWEEKLEY => "隔週",

            // self::MONTHLY_1 => "月一",
            // self::MONTHLY_2 => "月二",
            // self::MONTHLY_3 => "月三",
            // self::MONTHLY_4 => "月四",
            // self::MONTHLY_5 => "月五",
        };
    }
}
