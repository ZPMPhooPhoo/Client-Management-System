<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'quotation',
        'description',
        'is_agree',
        'quotation_date',
        'project_id'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function invoice()
    {
        return $this->hasMany(Invoice::class);
    }

    public function contract()
    {
        return $this->hasOne(Contract::class);
    }
}
