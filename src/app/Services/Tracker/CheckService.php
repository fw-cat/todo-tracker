<?php

namespace App\Services\Tracker;

use App\Exceptions\DuplicateTrackerCheckException;
use App\Exceptions\TrackerNotFoundException;
use App\Http\Requests\Api\TrackerCheck\StoreRequest;

class CheckService
{
    public function trackerCheck(int $tracker_id, StoreRequest $request): bool
    {
        $collection = $request->user()->trackers()->where([
            'id' => $tracker_id,
        ]);
        $isExists = $collection->exists();
        if (!$isExists) {
            throw new TrackerNotFoundException();
        }

        $target_dt = date("Y-m-d");
        $isExists = $collection->first()->checks()->where([
            'check_dt' => $target_dt,
        ])->exists();
        if ($isExists) {
            throw new DuplicateTrackerCheckException();
        }

        $collection->first()->checks()->create([
            'check_dt' => $target_dt,
        ]);
        return true;
    }
}
