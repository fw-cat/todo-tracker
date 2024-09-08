<?php

namespace App\Http\Controllers\Api;

use App\Enums\TrackerColor;
use App\Enums\TrackerInterval;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OptionsController extends Controller
{
    /**
     * フォームのオプション情報を返す
     */
    public function __invoke(): JsonResponse
    {
        $colors = array_map(function ($color) {
            return [
                'value' => $color->value,
                'name' => $color->getName(),
                'image' => $color->getImage(),
            ];
        }, TrackerColor::cases());

        $intervals = [];
        $intervals['daily'] = [
            'value' => TrackerInterval::DAILY->value,
            'name' => TrackerInterval::DAILY->getName(),
            'max' => TrackerInterval::DAILY->maxCount(),
        ];
        foreach (TrackerInterval::cases() as $interval) {
            if($interval === TrackerInterval::DAILY) {
                continue;
            }
            $intervals['others'][] = [
                'value' => $interval->value,
                'name' => $interval->getName(),
                'max' => $interval->maxCount(),
            ];
        }

        return new JsonResponse([
            'colors' => $colors,
            'intervals' => $intervals,
        ]);
    }
}
