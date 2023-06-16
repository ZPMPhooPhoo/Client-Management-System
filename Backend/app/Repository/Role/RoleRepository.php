<?php

namespace App\Repository\Role;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepoInterface
{
    public function get()
    {
        $data = Role::all();
        return $data;
    }

    public function user_role()
    {
        $data = Role::where('id', '<', 5)->get();
        return $data;
    }

    public function show($id)
    {
        $role = Role::where('id', $id)->first();
        $permission = Permission::get();

        $rolePermissions = $role->permissions->pluck('name')->toArray();

        //$rolePermissions = $role->permissions->pluck('id')->toArray();
        // return ($data,$permission,$rolePermissions);

        return ([
            'role' => $role,
            'permissions' => $permission,
            'rolePermissions' => $rolePermissions
        ]);
    }
}
