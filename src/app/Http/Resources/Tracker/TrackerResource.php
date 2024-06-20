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
                'image' => $this->color->getImage(),
                'name' => $this->color->getName(),
            ],
            'interval' => [
                'name' => $this->interval->getName(),
            ],
            
        ];
    }
}
