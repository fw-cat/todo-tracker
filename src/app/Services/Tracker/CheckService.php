<?php

namespace App\Services\Tracker;

use App\Exceptions\DuplicateTrackerCheckException;
use App\Exceptions\TrackerNotFoundException;
use App\Http\Requests\Api\TrackerCheck\StoreRequest;
use Carbon\Carbon;
use DateTime;

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

        $target_dt = Carbon::now();
        if ($target_dt->hour < config('const.tracker.check.base_time')) {
            // 4時前なら、日付を1日前に戻す
            $target_dt->subDays(1);
        }

        $isExists = $collection->first()->checks()->where([
            'check_dt' => $target_dt->toDateString(),
        ])->exists();
        if ($isExists) {
            throw new DuplicateTrackerCheckException();
        }

        $collection->first()->checks()->create([
            'check_dt' => $target_dt->toDateString(),
        ]);
        return true;
    }
}
