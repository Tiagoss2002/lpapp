<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    // Ver todo el stock actual
    public function index()
    {
        $stock = Stock::with('product')->get();
        return response()->json($stock);
    }

    // Cargar mercaderia nueva (suma al stock existente)
    public function addStock(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);
    
        $stock = Stock::where('product_id', $request->product_id)->first();

        if ($stock) {
            // Ya existe, sumamos
            $stock->update([
                'current_quantity' => $stock->current_quantity + $request->quantity,
                'initial_quantity' => $stock->initial_quantity + $request->quantity,
                'last_update'      => now(),
            ]);
        } else {
            // Primera vez que se carga este producto
            $stock = Stock::create([
                'product_id'       => $request->product_id,
                'initial_quantity' => $request->quantity,
                'current_quantity' => $request->quantity,
                'last_update'      => now(),
            ]);
        }

        return response()->json([
            'message' => 'Stock actualizado',
            'stock'   => $stock->load('product')
        ]);
    }

    // Ver stock de un producto especifico
    public function show($productId)
    {
        $stock = Stock::with('product')
            ->where('product_id', $productId)
            ->firstOrFail();

        return response()->json($stock);
    }
}
