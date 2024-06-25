<?php

namespace Database\Seeders;

use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // テストデータを削除
        User::truncate();

        // デモユーザ
        User::create([
            'user_name' => fake()->name(),
            'email' => "test@fw-cat.jp",
            'password' => Hash::make("password"),
            'status' => UserStatus::REGISTERD,
        ]);

        // デモユーザ
        User::create([
            'user_name' => "池田りり",
            'email' => "mashino1205@gmail.com",
            'password' => Hash::make("password"),
            'status' => UserStatus::REGISTERD,
        ]);
    }
}
