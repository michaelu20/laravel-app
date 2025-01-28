<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfilePictureController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

Route::post('/new-user', function () {
    $validated = request()->validate([
        'firstName' => 'required|string|max:255',
        'lastName' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
        'country' => 'required|string|max:255',
        'city' => 'required|string|max:255',
        'gender' => 'required|string|in:Male,Female,Non-binary',
        'interestedIn' => 'required|array|min:1',
        'interestedIn.*' => 'string|in:Men,Women,Non-binary',
        'dateOfBirth' => 'required|date|before:today',
    ]);

    $user = User::create([
        'name' => $validated['firstName'] . ' ' . $validated['lastName'],
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'country' => $validated['country'],
        'city' => $validated['city'],
        'gender' => $validated['gender'],
        'interested_in' => $validated['interestedIn'],
        'date_of_birth' => $validated['dateOfBirth'],
    ]);

    auth()->login($user);

    return redirect('/dashboard');
});


Route::get('/', function () {
    return Inertia::render('Welcome', []);
});

Route::get('/sign-up', function () {
    return Inertia::render('SignUp', []);
});

Route::get('/sign-in', function () {
    return Inertia::render('Auth/Login', [
        'canResetPassword' => Route::has('password.request'),
        'status' => session('status'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/update-profile-picture', [ProfilePictureController::class, 'update'])->name('profile.picture.update');
});

require __DIR__.'/auth.php';
