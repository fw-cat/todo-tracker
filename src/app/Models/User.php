<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use SoftDeletes;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password', "deleted_at"
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => UserStatus::class,
            'password' => 'hashed',
        ];
    }

    /****************
     * リレーション定義
     */
    /**
     * トラッカー
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Tracker>
     */
    public function trackers()
    {
        return $this->hasMany(Tracker::class, "user_id", "id");
    }
    /**
     * 仮登録コード
     * @return \Illuminate\Database\Eloquent\Relations\HasOne<temporaryRegistUser>
     */
    public function temporaryRegistUser()
    {
        return $this->hasOne(TemporaryRegistUser::class, "user_id", "id");
    }

    /*****************************************
     * スコープ
     */
    /**
     * アクティブかどうか。
     * @param Builder<User> $query
     */
    public function scopeIsActive(Builder $query): void
    {
        $query->where("status", UserStatus::REGISTERD)->orWhere("status", UserStatus::PRE_REGISTER);
    }

    /**
     * 有効ユーザのみ取得
     */
    public function isAcitive(): bool
    {
        return $this->status->isActive();
    }
}
