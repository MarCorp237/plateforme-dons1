<?php

namespace App\Http\Controllers;

use App\Models\Cause;
use App\Models\Don;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DonController extends Controller
{
    /**
     * Afficher le formulaire de don pour une cause.
     */
    public function create(Cause $cause)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Veuillez vous connecter pour faire un don.');
        }

        if ($cause->status !== 'active') {
            return redirect()->route('causes.index')->with('error', 'Cette cause n\'est plus active.');
        }

        return Inertia::render('Dons/Create', [
            'cause' => $cause,
            'auth' => ['user' => Auth::user()]
        ]);
    }

    /**
     * Enregistrer un don (simulation).
     */
    public function store(Request $request, Cause $cause)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $validated = $request->validate([
            'amount' => 'required|numeric|min:500|max:1000000',
            'payment_method' => 'required|in:orange_money,mtn_money',
            'phone' => 'required|string|regex:/^[6][5-9][0-9]{7}$/',
            'message' => 'nullable|string|max:500',
        ]);

        // Générer un code de transaction unique
        $transactionCode = strtoupper(substr($validated['payment_method'], 0, 2)) . time() . rand(100, 999);

        $don = Don::create([
            'user_id' => Auth::id(),
            'cause_id' => $cause->id,
            'amount' => $validated['amount'],
            'payment_method' => $validated['payment_method'],
            'transaction_code' => $transactionCode,
            'status' => 'pending',
            'message' => $validated['message'] ?? null,
        ]);

        return redirect()->route('dons.confirmation', $don)
                         ->with('success', 'Votre don a été enregistré ! En attente de validation.');
    }

    /**
     * Afficher la confirmation d'un don.
     */
    public function confirmation(Don $don)
    {
        if ($don->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Dons/Confirmation', [
            'don' => $don->load('cause'),
            'auth' => ['user' => Auth::user()]
        ]);
    }

    /**
     * Afficher l'historique des dons de l'utilisateur.
     */
    public function historique()
    {
        $dons = Auth::user()->dons()
            ->with('cause')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Dons/Historique', [
            'dons' => $dons,
            'auth' => ['user' => Auth::user()]
        ]);
    }

    /**
     * Admin: Afficher tous les dons.
     */
    public function adminIndex()
    {
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $dons = Don::with(['user', 'cause'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Dons', [
            'dons' => $dons,
            'auth' => ['user' => Auth::user()]
        ]);
    }

    /**
     * Admin: Valider un don.
     */
    public function valider(Don $don)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        DB::transaction(function () use ($don) {
            $don->update([
                'status' => 'validated',
                'validated_at' => now(),
            ]);

            $cause = $don->cause;
            $cause->increment('current_amount', $don->amount);

            // Générer un coupon pour le don
            $couponCode = 'COUPON-' . strtoupper(uniqid()) . '-' . $don->id;

            Coupon::create([
                'don_id' => $don->id,
                'code' => $couponCode,
                'used' => false,
            ]);

            if ($cause->isGoalReached()) {
                $cause->update(['status' => 'completed']);
            }
        });

        return redirect()->back()->with('success', 'Don validé avec succès !');
    }

    /**
     * Admin: Rejeter un don.
     */
    public function rejeter(Don $don)
    {
        if (Auth::user()->role !== 'admin') {
            abort(403);
        }

        $don->update(['status' => 'rejected']);

        return redirect()->back()->with('success', 'Don rejeté.');
    }
}
