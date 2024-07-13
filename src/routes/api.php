<?php

use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\OptionsController;
use App\Http\Controllers\Api\Tracker\CheckController as TrackerCheckController;
use App\Http\Controllers\Api\Tracker\TrackerController;
use App\Http\Controllers\Api\User\LoginController;
use App\Http\Controllers\Api\User\LogoutController;
use App\Http\Controllers\Api\User\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/tmp/options", OptionsController::class)->name("options");

Route::post("/login/", [LoginController::class, "login"])->name("login");
Route::post("/pre_register/", [RegisterController::class, "pre"])->name("register.pre");

Route::group(['middleware' => ['auth:sanctum,user-api']], function () {
  Route::get("/me", [MeController::class, "index"])->name("me");
  Route::post("/register/{hash}", [RegisterController::class, "authorize"])->name("register.authorize");
  Route::post("/logout/", [LogoutController::class, "logout"])->name("logout");

  Route::get("/tracker/", [TrackerController::class, "index"])->name("trackers");
  Route::post("/tracker/", [TrackerController::class, "store"])->name("trackers.store");
  Route::put("/tracker/", [TrackerController::class, "update"])->name("trackers.update");
  Route::delete("/tracker/", [TrackerController::class, "destroy"])->name("trackers.delete");

  Route::post("/tracker/{id}/check/", [TrackerCheckController::class, "store"])->name("tracker.check.store");
});
