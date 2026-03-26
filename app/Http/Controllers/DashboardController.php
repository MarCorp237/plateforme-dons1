<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Don;
use App\Models\Cause;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Dashboard pour les donateurs
     */
    public function index()
    {
        $user = Auth::user();

        $stats = [
            'totalDons' => Don::where('user_id', $user->id)->count(),
            'totalAmount' => Don::where('user_id', $user->id)->where('status', 'validated')->sum('amount'),
            'causesSupported' => Don::where('user_id', $user->id)->distinct('cause_id')->count('cause_id'),
            'totalComments' => \App\Models\Comment::where('user_id', $user->id)->count(),
        ];

        $recentDons = Don::where('user_id', $user->id)
            ->with('cause')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $recentComments = \App\Models\Comment::where('user_id', $user->id)
            ->with(['cause', 'user'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $causes = Cause::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $causes->map(function ($cause) {
            $cause->percentage = $cause->getPercentageAttribute();
            return $cause;
        });

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentDons' => $recentDons,
            'recentComments' => $recentComments,
            'causes' => $causes,
            'auth' => ['user' => $user]
        ]);
    }

    /**
     * Dashboard pour l'administrateur
     */
    public function adminDashboard()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $user = Auth::user();

        // Données pour les graphiques
        $dailyDonations = Don::where('status', 'validated')
            ->whereDate('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(created_at) as date, SUM(amount) as total')
            ->groupBy('date')
            ->pluck('total', 'date')
            ->toArray();

        // Compléter les jours manquants avec 0
        $dailyData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $dailyData[] = $dailyDonations[$date] ?? 0;
        }

        $weeklyDonations = Don::where('status', 'validated')
            ->whereBetween('created_at', [now()->subWeeks(4), now()])
            ->selectRaw('WEEK(created_at) as week, SUM(amount) as total')
            ->groupBy('week')
            ->orderBy('week')
            ->pluck('total')
            ->toArray();

        $monthlyDonations = Don::where('status', 'validated')
            ->whereYear('created_at', now()->year)
            ->selectRaw('MONTH(created_at) as month, SUM(amount) as total')
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total')
            ->toArray();

        $yearlyDonations = Don::where('status', 'validated')
            ->selectRaw('YEAR(created_at) as year, SUM(amount) as total')
            ->groupBy('year')
            ->orderBy('year')
            ->pluck('total')
            ->toArray();

        $stats = [
            'totalCollecte' => Don::where('status', 'validated')->sum('amount'),
            'dons' => Don::count(),
            'donsEnAttente' => Don::where('status', 'pending')->count(),
            'causes' => Cause::where('status', 'active')->count(),
            'completedCauses' => Cause::where('status', 'completed')->count(),
            'donateurs' => User::where('role', 'donateur')->count(),
            'newDonateurs' => User::where('role', 'donateur')->whereDate('created_at', '>=', now()->subDays(30))->count(),
            'growth' => 12,
            'donsGrowth' => 8,
            'dailyDonations' => $dailyData,
            'weeklyDonations' => $weeklyDonations,
            'monthlyDonations' => $monthlyDonations,
            'yearlyDonations' => $yearlyDonations,
            'causesLabels' => ['Enfants', 'Eau', 'Santé', 'Éducation', 'Autres'],
            'causesValues' => [35, 25, 20, 15, 5],
            'onlineDonations' => [65, 70, 75, 80, 85, 88, 92],
            'storeDonations' => [35, 30, 25, 20, 15, 12, 8],
        ];

        $recentDons = Don::with(['user', 'cause'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        $notifications = Notification::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentDons' => $recentDons,
            'notifications' => $notifications,
            'auth' => ['user' => $user]
        ]);
    }
}
