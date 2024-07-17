<?php

namespace App\Http\Requests\Api\Tracker;

use App\Enums\TrackerColor;
use App\Enums\TrackerInterval;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'trackers' => ["required", "array"],
            'trackers.*.name' => ["required", "string"],
            'trackers.*.color' => ["required", "integer", new Enum(TrackerColor::class)],
            'trackers.*.interval' => ["nullable", "integer", new Enum(TrackerInterval::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'trackers'  => "トラッカー一覧",
        ];
    }
}
