<?php

namespace App\Http\Resources\Tracker;

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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'color' => [
                'id' => $this->color,
                'image' => $this->color->getImage(),
                'name' => $this->color->getName(),
            ],
            'interval' => [
                'id' => $this->interval,
                'name' => $this->interval->getName(),
            ],
            'count' => $this->checks->count(),
        ];
    }
}
