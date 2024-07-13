<?php

namespace App\Http\Requests\Api\User\Register;

use Illuminate\Foundation\Http\FormRequest;

class PreRequest extends FormRequest
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
            'user_name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:App\Models\User,email'],
            'password' => ['required', 'string'],
            'password_confirmation' => ['required', 'string', 'same:password'],
        ];
    }

    public function attributes(): array
    {
        return [
            'user_name'  => "ユーザ名",
            'email'  => "E-Mail",
            'password'  => "パスワード",
            'password_confirmation'  => "パスワード（確認用）",
        ];
    }
}
