<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Don extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'cause_id', 'amount', 'payment_method',
        'transaction_code', 'status', 'validated_at', 'message'
    ];

    protected $casts = [
        'validated_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function cause()
    {
        return $this->belongsTo(Cause::class);
    }

    public function coupon()
    {
        return $this->hasOne(Coupon::class);
    }
}
