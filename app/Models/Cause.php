<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cause extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'goal_amount', 'current_amount',
        'image', 'end_date', 'status'
    ];

    protected $casts = [
        'end_date' => 'date',
    ];

    public function dons()
    {
        return $this->hasMany(Don::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function getPercentageAttribute()
    {
        if ($this->goal_amount > 0) {
            return min(100, round(($this->current_amount / $this->goal_amount) * 100));
        }
        return 0;
    }

    public function isGoalReached()
    {
        return $this->current_amount >= $this->goal_amount;
    }
}
