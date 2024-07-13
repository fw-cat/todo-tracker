<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Register\PreRequest;
use App\Http\Resources\UserResource;
use App\Services\User\RegisterService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    public function pre(PreRequest $request, RegisterService $service): JsonResponse
    {
        $preUser = $service->pre($request);
        if (!$preUser) {
            throw new AuthenticationException();
        }
        return new JsonResponse([
            "message" => "Pre Registerd.",
            'user' => new UserResource($preUser),
        ], Response::HTTP_OK);
    }

    public function authorize(Request $request, string $hash, RegisterService $service): JsonResponse
    {
        $authorized = $service->authorize($request, $hash);
        if (is_array($authorized)) {
            return new JsonResponse([
                "message" => $authorized['message'],
            ], $authorized['status']);
        }
        return new JsonResponse([
            "message" => "Authenticated.",
        ], Response::HTTP_OK);
    }
}
