<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackerCheck extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'check_dt',
    ];

    // 当月分のみを取得できるスコープ
    public function scopeToMonth($query)
    {
        $toDay = Carbon::now();
        $from = $toDay->firstOfMonth();
        $to = $toDay->lastOfMonth();
        return $query->whereBetween('check_dt', [$from, $to]);
    }
}
