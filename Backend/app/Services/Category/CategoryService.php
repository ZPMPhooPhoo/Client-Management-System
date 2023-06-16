<?php
namespace App\Services\Category;

use App\Models\Category;
use App\Services\Category\CategoryServiceInterface;

class CategoryService implements CategoryServiceInterface
{
    public function store($request)
    {        
        return Category::create($request);
    }

    public function update($request, $id){
        $category = Category::where('id', $id)->first();
        return $category->update($request);
    }

    public function delete($id)
    {
        $data = Category::where('id', $id)->first();
        return $data->delete();
    }
}