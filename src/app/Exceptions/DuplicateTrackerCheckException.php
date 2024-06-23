<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DuplicateTrackerCheckException extends Exception
{
    /**
     * 例外をHTTPレスポンスへレンダ
     */
    public function render(Request $reques): JsonResponse
    {
        return response()->json([
            'message' => 'トラッカー情報が不正です',
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
