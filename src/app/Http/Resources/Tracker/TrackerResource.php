<?php

namespace App\Http\Resources\Tracker;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrackerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // 当日を取得
        $today = Carbon::now();
        // 月カウント（月末日）を取得
        $endMonuth = Carbon::now()->endOfMonth();
        // 当日までのチェック数
        $checked = $this->checks()->toMonth()->count();

        // 割合
        $achievement = floor(($checked / $this->interval->maxCount()) * 100);
        if ($achievement > 100) {
            $achievement = 100;
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'color' => $this->color,
            "_color" => [
                'id' => $this->color,
                'image' => $this->color->getImage(),
                'name' => $this->color->getName(),
            ],
            'interval' => $this->interval,
            'interval_label' => $this->interval->getName(),
            '_interval' => [
                'id' => $this->interval,
                'name' => $this->interval->getName(),
            ],
            'count' => $checked,
            'today' => intval($today->format("d")),
            'max_count' => $this->interval->maxCount(),
            'achievement' => $achievement,
            'is_checked' => $this->hasCheckOn(),
            'check_days' => $this->checks()->toMonth()->get('check_dt')->map(function() {
                return Carbon::parse($this->check_dt)->format("Y-m-d");
            }),
        ];
    }
}
