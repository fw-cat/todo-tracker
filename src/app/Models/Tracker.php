<?php

namespace App\Models;

use App\Enums\TrackerColor;
use App\Enums\TrackerInterval;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tracker extends Model
{
    use HasFactory;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'color',
        'interval',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        "user_id", "deleted_at"
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'color' => TrackerColor::class,
            'interval' => TrackerInterval::class,
        ];
    }

    /**************************
     * アクセサ
     */
    /**
     * トラッカーの画像アイコン
     * @return string
     */
    public function getTrackerImageAttribute(): string
    {
        return $this->color->getImage();
    }

    /****************
     * リレーション定義
     */
    /**
     * ユーザ
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<User>
     */
    public function user()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
    /**
     * チェック
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<User>
     */
    public function checks()
    {
        return $this->hasMany(TrackerCheck::class, "tracker_id", "id");
    }

    /**
     * 当日がチェックされているか
     */
    public function hasCheckOn(): bool
    {
        $today = new DateTime();
        return $this->checks()
            ->whereDate('check_dt', $today)
            ->exists();
    }
}
