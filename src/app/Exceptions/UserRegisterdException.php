<?php

namespace App\Exceptions;

use Exception;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class UserRegisterdException extends Exception
{
    /**
     * 例外をHTTPレスポンスへレンダ
     */
    public function render(Request $reques): JsonResponse
    {
        return response()->json([
            'message' => 'ユーザの登録に失敗しました',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
