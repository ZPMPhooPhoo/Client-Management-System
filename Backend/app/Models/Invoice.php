<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice',
        'description',
        'invoice_date',
        'contract_id',
        'quotation_id'
    ];

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function quotation()
    {
        $this->belongsTo(Quotation::class);
    }

    public function receipt()
    {
        return $this->hasOne(Receipt::class);
    }
}
