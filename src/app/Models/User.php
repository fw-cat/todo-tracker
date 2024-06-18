<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use SoftDeletes;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
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

    /*****************************************
     * スコープ
     */
    /**
     * アクティブかどうか。（今後公開フラグ以外の条件も含めて外部に公開できるものかどうか）
     * @param Builder<User> $query
     */
    public function scopeIsActive(Builder $query): void
    {
        $query->where("status", UserStatus::REGISTERD);
    }

    /**
     * 有効ユーザのみ取得
     */
    public function isAcitive(): bool
    {
        return $this->status->isActive();
    }
}
