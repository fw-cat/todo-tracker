<?php

namespace App\Services\User;

use App\Http\Requests\Api\User\Login\LoginRequest;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

/**
 * ログイン機能
 */
class LoginService
{
    /**
     * ログイン処理
     */
    public function login(LoginRequest $request): User|bool
    {
        $email = $request->input("email");
        $password = $request->input("password");

        $user = User::where([
            'email' => $email,
        ])->first();
        if (!empty($user) && Hash::check($password, $user->password)) {
            return $user;
        }
        throw new AuthenticationException();
    }
}
