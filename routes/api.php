<?php

use App\Http\Controllers\Zaions\AuthController;
use App\Http\Controllers\Zaions\UserController;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::delete('/logout', 'logout')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UserController::class)->group(function () {
        Route::get('/getUserData', 'getUserData');
        Route::put('/updateUserData', 'updateUserData');
        Route::post('/updateUserStatus', 'updateUserStatus');
    });
});
