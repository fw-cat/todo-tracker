<?php

use App\Enums\TrackerColor;
use App\Enums\TrackerInterval;
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
        Schema::create('trackers', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id')->nullable(false)->comment("ユーザID");

            $table->string("name", 512)->nullable(false)->comment("トラッカー名");
            $table->integer("color", unsigned: true)->nullable(false)->default(TrackerColor::INDIGO->value)->comment("カラー");;

            $table->integer("interval", unsigned: true)->nullable(false)->default(TrackerInterval::DAILY->value)->comment("実行間隔");

            $table->timestamps();
            $table->softDeletes();
            $table->comment("トラッカー");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trackers');
    }
};
