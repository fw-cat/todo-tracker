<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserSettingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'is_achievement'    => $this->is_achievement,
            'is_message'        => $this->message_type->isEnabled(),
            'message_type'      => $this->message_type,
        ];
    }
}
