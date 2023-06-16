<?php

namespace App\Services\Permission;
use App\Services\Permission\PermissionServiceInterface;
use Spatie\Permission\Models\Permission;

class PermissionService implements PermissionServiceInterface
{
    public function store($request)
    {
        return  Permission::create($request);
    }

    public function update($request,$id)
    {
        $permission = Permission::where('id', $id)->first();
        return $permission->update($request);
    }

    public function delete($id)
    {
        $data = Permission::where('id', $id)->first();
        return $data->delete();
    }
}