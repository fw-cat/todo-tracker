<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        return new JsonResponse([
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }
}
