<?php

namespace App\Services\Role;

interface RoleServiceInterface
{
    public function store($request);

    public function update($request,$id);
    
    public function delete($id);
}