<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Login\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\User\LoginService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\AuthManager;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * @param AuthManager $auth
     */
    public function __construct(
        private AuthManager $auth,
    ) {
    }

    public function login(LoginRequest $request, LoginService $service): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);
        if ($this->auth->guard('user-api')->attempt($credentials)) {
            $request->session()->regenerate();

            return new JsonResponse([
                'message' => 'Authenticated.',
            ]);
        }
        throw new AuthenticationException();

        // $credentials = $service->login($request);
        // if (!$credentials) {
        //     throw new AuthenticationException();
        // }
        // return new JsonResponse([
        //     'user' => new UserResource($credentials),
        // ], Response::HTTP_OK);
    }
}
