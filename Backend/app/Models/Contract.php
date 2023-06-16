<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'contract',
        'description',
        'contract_date',
        'quotation_id'
    ];

    public function invoice()
    {
        return $this->hasMany(Invoice::class);
    }

    public function quotation()
    {
        return $this->belongsTo(Quotation::class);
    }
}
