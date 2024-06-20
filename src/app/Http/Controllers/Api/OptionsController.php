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
        $intervals = array_map(function ($interval) {
            return [
                'value' => $interval->value,
                'name' => $interval->getName(),
            ];
        }, TrackerInterval::cases());

        return new JsonResponse([
            'colors' => $colors,
            'intervals' => $intervals,
        ]);
    }
}
