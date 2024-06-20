<?php

namespace App\Services\Tracker;

use App\Enums\TrackerInterval;
use App\Http\Requests\Api\Tracker\StoreRequest;
use App\Models\Tracker;
use Illuminate\Support\Facades\DB;

class TrackerService
{
    public function store(StoreRequest $request) : bool|array
    {
        DB::transaction(function () use ($request) {
            $user_id    = $request->integer("user");
            $name       = $request->string("name");
            $color      = $request->integer("color");
            $interval   = $request->input("interval") ?? TrackerInterval::DAILY;

            $tracker = new Tracker();
            $tracker->user_id   = $user_id;
            $tracker->name      = $name;
            $tracker->color     = $color;
            $tracker->interval  = $interval;
            $tracker->save();
        });
        return true;
    }
}
