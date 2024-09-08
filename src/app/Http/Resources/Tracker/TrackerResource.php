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
        // 月カウント（月末日）を取得
        $toMonth = Carbon::now()->endOfMonth();;

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
            '_interval' => [
                'id' => $this->interval,
                'name' => $this->interval->getName(),
            ],
            'count' => $this->checks()->toMonth()->count(),
            'max_count' => $toMonth,
            'is_checked' => $this->hasCheckOn(),
        ];
    }
}
