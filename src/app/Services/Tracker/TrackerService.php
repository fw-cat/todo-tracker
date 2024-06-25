<?php

namespace App\Services\Tracker;

use App\Enums\TrackerColor;
use App\Enums\TrackerInterval;
use App\Http\Requests\Api\Tracker\StoreRequest;
use App\Http\Requests\Api\Tracker\UpdateRequest;
use App\Http\Resources\Tracker\TrackerCollection;
use App\Models\Tracker;
use Illuminate\Support\Facades\DB;

class TrackerService
{
    /**
     * トラッカー新規登録
     * @param StoreRequest $request
     * @return bool|array
     */
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

    /**
     * トラッカーの一括更新
     */
    public function update(UpdateRequest $request) : bool|array
    {
        $old_trackers = $request->user()->trackers->toArray();
        $old_ids = array_map(function($tracker) {
            return $tracker['id'];
        }, $old_trackers);

        $new_trackers = $request->input("trackers");
        $new_ids = array_map(function($tracker) {
            return $tracker['id'];
        }, $new_trackers);

        // 削除分の差分を取得
        $delete_ids = array_diff($old_ids, $new_ids);
        DB::transaction(function() use ($delete_ids, $new_trackers) {
            // 更新分
            foreach($new_trackers as $tracker) {
                $row = Tracker::where([
                    'id' => $tracker['id'],
                ])->first();
                $row->name = $tracker['name'];
                $row->color = TrackerColor::from($tracker['color']['id']);
                $row->interval = TrackerInterval::from($tracker['interval']['id']);
                $row->save();
            }

            // 削除
            Tracker::whereIn("id", $delete_ids)->delete();
        });

        return true;
    }
}
