<?php

use App\Http\Controllers\Zaions\TestController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::delete('/logout', function (Request $request) {
        try {
            $user = $request->user();
            $user->tokens()->delete();
            return response()->json(['success' => true]);
        } catch (\Throwable $th) {
            return response()->json(['success' => false]);
        }
    });
});

Route::controller(TestController::class)->group(function () {
    Route::get('/test-api-1', 'testApi1');
});

Route::get('/test-sanctum', function () {
    $user = User::where('email', '=', 'aoneahsan@gmail.com')->first();
    if (!$user) {
        $user = User::create([
            'email' => 'aoneahsan@gmail.com',
            'password' => Hash::make('Asd123!@#')
        ]);
    }


    $token = $user->createToken('auth-token');

    return response()->json(['user' => $user, 'token' => $token]);
});
