<?php

namespace App\Models;

use App\Enums\MessageType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use PhpParser\Node\Expr\Cast;

class UserSetting extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * キャストする必要のある属性
     *
     * @var array
     */
    protected $casts = [
        'is_achievement'    => 'bool',
        'message_type'      => MessageType::class,
    ];

    public static function default() {
        $setting = new UserSetting();
        $setting->is_achievement = true;
        $setting->message_type = MessageType::NONE;

        return $setting;
    }
}
