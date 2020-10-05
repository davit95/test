<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RoomsController;
use App\Http\Controllers\API\ReservationsController;
use App\Http\Controllers\API\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);


Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [UserController::class, 'user']);
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/rooms', [RoomsController::class, 'index']);
    Route::get('/reservations', [ReservationsController::class, 'index']);
    Route::post('/reservations', [ReservationsController::class, 'create']);
    Route::get('/reservations/{id}', [ReservationsController::class, 'show']);
    Route::put('/reservations/{id}', [ReservationsController::class, 'update'])->middleware('hasAccess');
});
