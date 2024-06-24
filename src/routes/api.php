<?php

use App\Http\Controllers\Api\MeController;
use App\Http\Controllers\Api\OptionsController;
use App\Http\Controllers\Api\Tracker\CheckController as TrackerCheckController;
use App\Http\Controllers\Api\Tracker\TrackerController;
use App\Http\Controllers\Api\User\LoginController;
use App\Http\Controllers\Api\User\LogoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/tmp/options", OptionsController::class)->name("options");

Route::post("/login/", [LoginController::class, "login"])->name("login");

Route::group(['middleware' => ['auth:user-api,sanctum']], function () {
  Route::get("/me", [MeController::class, "index"])->name("me");
  Route::post("/logout/", [LogoutController::class, "logout"])->name("logout");

  Route::apiResource("/tracker/", TrackerController::class);
  Route::apiResource("/tracker/{id}/check/", TrackerCheckController::class)->only(["store"]);
});
