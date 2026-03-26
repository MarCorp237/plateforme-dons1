<?php

namespace App\Http\Controllers;

use App\Models\Cause;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CauseController extends Controller
{
    public function index()
    {
        $causes = Cause::where('status', 'active')
                    ->orderBy('created_at', 'desc')
                    ->paginate(9);

        $causes->getCollection()->transform(function ($cause) {
            $cause->percentage = $cause->getPercentageAttribute();
            return $cause;
        });

        return Inertia::render('Causes/Index', [
            'causes' => $causes,
            'auth' => ['user' => Auth::user()]
        ]);
    }
    public function adminIndex()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403);
        }

        $causes = Cause::withCount('dons')
                    ->orderBy('created_at', 'desc')
                    ->paginate(10);

        $causes->getCollection()->transform(function ($cause) {
            $cause->percentage = $cause->getPercentageAttribute();
            return $cause;
        });

        return Inertia::render('Admin/Causes/Index', [
            'causes' => $causes,
            'auth' => ['user' => Auth::user()]
        ]);
    }

    public function show(Cause $cause)
    {
        $donsValides = $cause->dons()->where('status', 'validated')->get();
        $totalCollecte = $donsValides->sum('amount');
        $donateursRecents = $donsValides->take(10)->load('user');
        $comments = $cause->comments()->with('user')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Causes/Show', [
            'cause' => $cause,
            'totalCollecte' => $totalCollecte,
            'donateursRecents' => $donateursRecents,
            'comments' => $comments,
            'auth' => ['user' => Auth::user()]
        ]);
    }

    // Méthodes admin...
    public function create()
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403);
        }
        return Inertia::render('Causes/Create', ['auth' => ['user' => Auth::user()]]);
    }

    public function store(Request $request)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_amount' => 'required|numeric|min:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'end_date' => 'nullable|date|after:today',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('causes', 'public');
            $validated['image'] = $imagePath;
        }

        $validated['current_amount'] = 0;
        $validated['status'] = 'active';

        Cause::create($validated);

        return redirect()->route('causes.index')->with('success', 'Cause créée avec succès !');
    }

    public function edit(Cause $cause)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('Causes/Edit', [
            'cause' => $cause,
            'auth' => ['user' => Auth::user()]
        ]);
    }

    public function update(Request $request, Cause $cause)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal_amount' => 'required|numeric|min:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'end_date' => 'nullable|date|after:today',
            'status' => 'in:active,completed',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('causes', 'public');
            $validated['image'] = $imagePath;
        }

        $cause->update($validated);

        return redirect()->route('causes.index')->with('success', 'Cause mise à jour !');
    }

    public function destroy(Cause $cause)
    {
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            abort(403);
        }
        $cause->delete();
        return redirect()->route('causes.index')->with('success', 'Cause supprimée !');
    }
}
