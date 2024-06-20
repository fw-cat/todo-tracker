<?php

namespace App\Http\Requests\Api\Tracker;

use App\Enums\TrackerColor;
use App\Enums\TrackerInterval;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user' => ['required', 'integer', 'exists:\App\Models\User,id'],
            'name' => ['required', 'string'],
            'color' => ['required', new Enum(TrackerColor::class)],
            'interval' => ['nullable', new Enum(TrackerInterval::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'user'  => "ログインユーザ",
            'name'  => "トラッカー名",
            'color'  => "色",
            'interval'  => "間隔",
        ];
    }
}
