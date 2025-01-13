<?php

namespace App\Services\User;

use App\Http\Requests\Api\User\Setting\ToggleRequest;
use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Support\Facades\DB;

class SettingToggleService
{
    public function achievement(ToggleRequest $request): array|User
    {
        $user = $request->user();

        DB::transaction(function () use ($user) {
            $setting = $user->setting ?? UserSetting::default();
            $setting->is_achievement = !$setting->is_achievement;
            $user->setting()->save($setting);
        });
        // ユーザ情報の再取得
        $user = User::where(['id' => $user->id])->first();

        return $user;
    }
}
