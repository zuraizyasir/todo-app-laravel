<?php

use Illuminate\Support\Facades\Route;

// API routes (we'll add auth and todo routes later)
Route::prefix('api')->group(function () {
    // Placeholder for API routes
});

// Catch-all for Vue SPA (must be last)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');