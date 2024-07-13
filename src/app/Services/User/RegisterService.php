<?php

namespace App\Services\User;

use App\Enums\UserStatus;
use App\Exceptions\UserRegisterdException;
use App\Http\Requests\Api\User\Register\PreRequest;
use App\Mail\User\Register\PreRegisterMail;
use App\Models\TemporaryRegistUser;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class RegisterService
{
    /**
     * 仮登録
     * @param PreRequest $request
     * @return User|bool
     */
    public function pre(PreRequest $request): User|bool
    {
        $creditionals = $request->only(['user_name', 'email', 'password']);
        $user = new User();
        try {
            // ユーザの仮登録
            $hash_code = Str::uuid();
            DB::transaction(function() use ($user, $creditionals, $hash_code) {
                $user->user_name = $creditionals['user_name'];
                $user->email = $creditionals['email'];
                $user->password = Hash::make($creditionals['password']);
                $user->status = UserStatus::PRE_REGISTER;
                $user->save();
        
                $tempUser = new TemporaryRegistUser();
                $tempUser->user_id = $user->id;
                $tempUser->hash_code = $hash_code;
                $tempUser->expired_at = (strtotime("now") + config('const.user.register.expired'));
                $tempUser->save();
            });

            // メール送信
            $authUrl = config('const.front.url') . "/user/auth/{$hash_code}";
            Mail::to($user->email)->send(new PreRegisterMail($authUrl));

        } catch(Exception $e) {
            throw new UserRegisterdException();
        }

        return $user;
    }

    /**
     * 本登録認証
     * @param Request $request
     * @param string $hash
     * @return array|bool
     */
    public function authorize(Request $request, string $hash): array|bool
    {
        $user = $request->user();
        $tempUser = $user->temporaryRegistUser;

        // ハッシュコードチェック
        if ($tempUser->hash_code !== $hash) {
            return [
                'message' => "認証URLが不正です。",
                'status' => Response::HTTP_FORBIDDEN,
            ];
        }

        // 有効期限チェック
        $now_at = strtotime("now");
        $expired_at = strtotime($tempUser->expired_at);
        if ($expired_at < $now_at) {
            return [
                'message' => "認証URLが無効です。",
                'status' => Response::HTTP_UNPROCESSABLE_ENTITY,
            ];
        }

        // ステータスの更新
        DB::transaction(function() use ($user, $tempUser) {
            // ユーザのステータスを更新
            $user->status = UserStatus::REGISTERD;
            $user->save();

            // テンプユーザを削除
            $tempUser->delete();
        });

        return true;
    }
}
