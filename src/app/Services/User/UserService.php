<?php

namespace App\Services\User;

use App\Exceptions\UserNotFoundException;
use App\Models\User;

class UserService
{
    /**
     * ユーザを返す
     */
    public function getUser(int $user_id): User
    {
        $user = User::where([
            'id' => $user_id,
        ])->first();

        if (empty($user)) {
            throw new UserNotFoundException();
        }

        return $user;
    }
}
