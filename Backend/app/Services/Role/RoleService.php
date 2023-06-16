<?php
namespace App\Services\Role;

use App\Services\Role\RoleServiceInterface;
use Spatie\Permission\Models\Role;

class RoleService implements RoleServiceInterface
{
    public function store($request)
    {   
        $data = Role::create($request);

        $data->givePermissionTo($request['permissions']);
        return $data;
    }

    public function update($request, $id){
        $role = Role::where('id', $id)->first();
        $data = $role->update($request);
        $data->syncPermissions($request['permissions']);
        return $data;
    }

    public function delete($id)
    {
        $data = Role::where('id', $id)->first();
        return $data->delete();
    }
}