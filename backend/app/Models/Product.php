<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'price', 'active'];
    // app/Models/Product.php
    public function stock()
    {
        return $this->hasOne(Stock::class);
    }
}

