<?php

namespace App\Http\Controllers\Api\Tracker;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Tracker\IndexRequest;
use App\Http\Requests\Api\Tracker\StoreRequest;
use App\Http\Requests\Api\Tracker\UpdateRequest;
use App\Http\Resources\Tracker\TrackerCollection;
use App\Services\Tracker\TrackerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TrackerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request): JsonResponse
    {
        return new JsonResponse([
            'trackers' => new TrackerCollection($request->user()->trackers),
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request, TrackerService $service): JsonResponse
    {
        $result = $service->store($request);
        if (is_array($result)) {
            return new JsonResponse([
                'message' => $result['message'],
            ], $result['responce']);
        }
        return new JsonResponse([
            'message' => "登録が完了しました。",
        ], Response::HTTP_OK);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        return new JsonResponse([], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, TrackerService $service): JsonResponse
    {
        $result = $service->update($request);
        if (!$result) {
            return new JsonResponse([
                'message' => "問題が発生しました",
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        return new JsonResponse([
            'message' => "更新が完了しました",
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): JsonResponse
    {
        $request->user()->trackers()->delete();

        return new JsonResponse([
            'message' => "削除が完了しました",
        ], Response::HTTP_OK);
    }
}
