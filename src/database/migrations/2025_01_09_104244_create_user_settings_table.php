<?php

use App\Enums\MessageType;
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
        Schema::create('user_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable(false)->comment("ユーザID");

            $table->boolean("is_achievement")->default(true)->nullable(false)->comment("達成度（％）表示");
            $table->integer('message_type', unsigned: true)->default(MessageType::NONE)->nullable(false)->comment("メッセージタイプ");

            $table->timestamps();
            $table->softDeletes();
            $table->comment("ユーザ設定");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_settings');
    }
};
