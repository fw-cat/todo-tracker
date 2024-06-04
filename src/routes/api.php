<?php

use App\Http\Controllers\Api\Tracker\TrackerController;
use App\Http\Controllers\Api\User\LoginController;
use App\Http\Controllers\Api\User\LogoutController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/login/", [LoginController::class, "login"])->name("login");
Route::post("/logout/", [LogoutController::class, "logout"])->name("logout");

Route::apiResource("/tracker/", TrackerController::class)->middleware('auth:sanctum');