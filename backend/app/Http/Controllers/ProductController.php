<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['stock:product_id,current_quantity'])->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ]);

        $product = Product::create($request->all());

        // Crear stock inicial
        Stock::create([
            'product_id' => $product->id,
            'quantity'   => 1,
        ]);
        return response()->json(['message' => 'Producto creado', 'product' => $product], 201);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id)->get();
        // Ponemos el campo delete_at en la fecha de hoy
        $product->delete_at = now();
        $product->save();

        return response()->json(['message' => 'Producto eliminado']);
    }
}
