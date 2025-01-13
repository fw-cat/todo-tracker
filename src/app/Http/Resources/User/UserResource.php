<?php

namespace App\Http\Resources\User;

use App\Models\UserSetting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'user_name' => $this->user_name,
            'email' => $this->email,
            'status' => $this->status->getLabel(),

            'setting' => new UserSettingResource($this->setting ?? UserSetting::default()),
        ];
    }
}
