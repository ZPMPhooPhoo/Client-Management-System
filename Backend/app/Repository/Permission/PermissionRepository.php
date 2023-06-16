<?php

namespace App\Repository\Permission;

use Spatie\Permission\Models\Permission;

class PermissionRepository implements PermissionRepoInterface
{
    public function get()
    {
        $data = Permission::all();
        return $data;
    }

    public function show($id)
    {
        $data = Permission::where('id', $id)->first();
        return $data;
    }
}