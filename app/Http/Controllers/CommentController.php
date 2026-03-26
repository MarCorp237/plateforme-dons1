<?php

namespace App\Http\Controllers;

use App\Models\Cause;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Enregistrer un commentaire.
     */
    public function store(Request $request, Cause $cause)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Veuillez vous connecter pour commenter.');
        }

        $validated = $request->validate([
            'content' => 'required|string|min:3|max:1000',
        ]);

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'cause_id' => $cause->id,
            'content' => $validated['content'],
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'comment' => $comment->load('user')
            ]);
        }

        return redirect()->back()->with('success', 'Commentaire ajouté avec succès !');
    }

    /**
     * Supprimer un commentaire.
     */
    public function destroy(Comment $comment)
    {
        if (Auth::id() !== $comment->user_id && Auth::user()->role !== 'admin') {
            abort(403);
        }

        $comment->delete();

        return redirect()->back()->with('success', 'Commentaire supprimé.');
    }

    /**
     * Récupérer les commentaires d'une cause (API).
     */
    public function getComments(Cause $cause)
    {
        $comments = $cause->comments()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comments);
    }
}
