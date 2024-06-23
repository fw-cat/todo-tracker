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
        Schema::create('tracker_checks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("tracker_id")->nullable(false)->comment("トラッカーID");    

            $table->date("check_dt")->nullable(false)->comment("チェック日");

            $table->timestamps();
            $table->comment("トラッカーチェック");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tracker_checks');
    }
};
