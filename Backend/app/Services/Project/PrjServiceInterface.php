<?php

namespace App\Services\Project;

interface PrjServiceInterface
{
    public function store($request);

    public function update($request,$id);
    
    public function delete($id);

    public function projectsActive($request);
}