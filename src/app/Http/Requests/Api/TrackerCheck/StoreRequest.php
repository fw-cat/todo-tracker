<?php

namespace App\Http\Requests\Api\TrackerCheck;

use Illuminate\Foundation\Http\FormRequest;

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
        ];
    }

    public function attributes(): array
    {
        return [
            'user'  => "ログインユーザ",
        ];
    }
}
