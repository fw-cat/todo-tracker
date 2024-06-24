<?php

namespace App\Services\Tracker;

use App\Enums\TrackerInterval;
use App\Http\Requests\Api\Tracker\StoreRequest;
use Illuminate\Support\Facades\DB;

class TrackerService
{
    public function store(StoreRequest $request) : bool|array
    {
        DB::transaction(function () use ($request) {
            $name       = $request->string("name");
            $color      = $request->integer("color");
            $interval   = $request->input("interval") ?? TrackerInterval::DAILY;

            $request->user()->trackers()->create([
                'name'      => $name,
                'color'     => $color,
                'interval'  => $interval,
            ])->save();
        });
        return true;
    }
}
