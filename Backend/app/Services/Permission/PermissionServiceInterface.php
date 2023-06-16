<?php

namespace App\Services\Permission;

interface PermissionServiceInterface
{
    public function store($request);

    public function update($request, $id);

    public function delete($id);
}