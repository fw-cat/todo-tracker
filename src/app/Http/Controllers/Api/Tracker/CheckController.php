<?php

namespace App\Http\Controllers\Api\Tracker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\TrackerCheck\StoreRequest;
use App\Http\Resources\Tracker\TrackerCollection;
use App\Services\Tracker\CheckService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CheckController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(int $id, StoreRequest $request, CheckService $service): JsonResponse
    {
        $result = $service->trackerCheck($id, $request);
        return new JsonResponse([
            'message' => "登録が完了しました。",
            'trackers' => new TrackerCollection($request->user()->trackers),
        ], Response::HTTP_OK);

    }
}
