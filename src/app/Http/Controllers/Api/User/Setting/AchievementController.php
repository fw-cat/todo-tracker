<?php

namespace App\Http\Controllers\Api\User\Setting;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\User\Setting\ToggleRequest;
use App\Http\Resources\User\UserResource;
use App\Services\User\SettingToggleService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Http\Response;

class AchievementController extends Controller
{
    public function toggle(ToggleRequest $request, SettingToggleService $service): JsonResponse
    {
        $user = $service->achievement($request);
        if (is_array($user)) {
            return new JsonResponse([
                "message" => $user['message'],
            ], $user['status']);
        }

        return new JsonResponse([
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }
}
