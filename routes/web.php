<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CauseController;
use App\Http\Controllers\DonController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

// Page d'accueil publique
Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('home');

// Routes d'authentification personnalisées
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    })->name('login');

    Route::get('/register', function () {
        return Inertia::render('Auth/Register');
    })->name('register');
});

// Routes pour les causes (accessibles à tous - version donateur)
Route::get('/causes', [CauseController::class, 'index'])->name('causes.index');
Route::get('/causes/{cause}', [CauseController::class, 'show'])->name('causes.show');

// Routes protégées (authentification requise - Donateurs)
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard utilisateur (donateur)
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Routes pour les dons
    Route::get('/dons/create/{cause}', [DonController::class, 'create'])->name('dons.create');
    Route::post('/dons/store/{cause}', [DonController::class, 'store'])->name('dons.store');
    Route::get('/dons/confirmation/{don}', [DonController::class, 'confirmation'])->name('dons.confirmation');
    Route::get('/dons/historique', [DonController::class, 'historique'])->name('dons.historique');

    // Routes pour les commentaires
    Route::post('/comments/{cause}', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Routes profil
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Routes admin (authentification + rôle admin requis)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard admin
    Route::get('/dashboard', [DashboardController::class, 'adminDashboard'])->name('dashboard');

    // Gestion des dons (admin)
    Route::get('/dons', [DonController::class, 'adminIndex'])->name('dons');
    Route::post('/dons/{don}/valider', [DonController::class, 'valider'])->name('dons.valider');
    Route::post('/dons/{don}/rejeter', [DonController::class, 'rejeter'])->name('dons.rejeter');

    // Gestion des causes (admin)
    Route::get('/causes', [CauseController::class, 'adminIndex'])->name('causes.index');
    Route::get('/causes/create', [CauseController::class, 'create'])->name('causes.create');
    Route::post('/causes', [CauseController::class, 'store'])->name('causes.store');
    Route::get('/causes/{cause}/edit', [CauseController::class, 'edit'])->name('causes.edit');
    Route::put('/causes/{cause}', [CauseController::class, 'update'])->name('causes.update');
    Route::delete('/causes/{cause}', [CauseController::class, 'destroy'])->name('causes.destroy');
});

// Redirection après connexion
Route::get('/redirect', function () {
    if (Auth::check()) {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('redirect');

// Inclure les routes d'authentification par défaut
require __DIR__.'/auth.php';
