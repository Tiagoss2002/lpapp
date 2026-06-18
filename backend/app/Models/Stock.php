<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $table = 'stock';
    
    protected $fillable = [
        'product_id', 'initial_quantity', 'current_quantity', 'last_update'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}