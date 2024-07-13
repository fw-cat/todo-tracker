<?php

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
        Schema::create('temporary_regist_users', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->nullable(false)->comment("ユーザID");
            $table->uuid("hash_code")->nullable(false)->comment("認証用ハッシュキー");
            $table->timestamp("expired_at")-> nullable(false)->comment("有効期限");

            $table->timestamps();
            $table->comment("仮登録ユーザ");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temporary_regist_users');
    }
};
