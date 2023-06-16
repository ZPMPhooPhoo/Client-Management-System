<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    use HasFactory;

    protected $fillable = [
        'receipt',
        'description',
        'receipt_date',
        'invoice_id'
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
