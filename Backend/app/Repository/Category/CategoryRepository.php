<?php

namespace App\Repository\Category;
use App\Models\Category;

class CategoryRepository implements CategoryRepoInterface
{
    public function get()
    {
        $data = Category::all();
        return $data;
    }

    public function show($id)
    {
        $data = Category::where('id', $id)->first();
        return $data;
    }

    public function categoriesByName($request){
        $data = Category::where('category', 'like', '%' . $request->searchCategory . '%')
        ->get();
        return $data;
    }
}