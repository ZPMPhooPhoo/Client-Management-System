<?php

namespace App\Services\Category;

interface CategoryServiceInterface
{
    public function store($request);

    public function update($request,$id);
    
    public function delete($id);
}