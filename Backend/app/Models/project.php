<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'maintenance_active',
        'category_id',
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_projects');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function quotation()
    {
        return $this->hasMany(Quotation::class);
    }

}
