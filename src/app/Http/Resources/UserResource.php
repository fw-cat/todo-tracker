<?php

namespace App\Http\Resources;

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
            'id' => $this->createToken('auth_token')->plainTextToken,
            'user_name' => $this->user_name,
            'email' => $this->email,
            'status' => $this->status->getLabel(),
        ];
    }
}
