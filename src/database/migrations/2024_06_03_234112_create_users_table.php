<?php

use App\Enums\UserStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();

            $table->string("user_name", 256)->nullable(false)->comment("ユーザ名");
            $table->string("email", 1024)->nullable(false)->comment("メールアドレス");
            $table->text("password")->nullable(false)->comment("パスワード");
            $table->integer("status", unsigned: true)->nullable(false)->default(UserStatus::PRE_REGISTER->value)->comment("ステータス");;

            $table->timestamps();
            $table->softDeletes();
            $table->comment("ユーザ");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
