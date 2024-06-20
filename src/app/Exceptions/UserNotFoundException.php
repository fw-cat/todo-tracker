<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserNotFoundException extends Exception
{
    /**
     * 例外をHTTPレスポンスへレンダ
     */
    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'message' => '該当するデータが見つかりませんでした。',
        ], Response::HTTP_NOT_FOUND);
    }
}
