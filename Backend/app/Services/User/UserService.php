<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService implements UserServiceInterface
{
    public function store($request)
    {
        $request['password'] = Hash::make($request['password']);
        $existingUser = User::where('email', $request['email'])->first();

        if ($existingUser) {
            throw ValidationException::withMessages([
                'email' => 'The email address is already exists.',
            ]);
        }
        $data = User::create($request);
        $data->assignRole($request['role_id']);
        return $data;
    }
    public function update($request, $id)
    {
        $user = User::where('id', $id)->first();
        $existingUser = User::where('email', $request['email'])->where('id', '!=',  $id)->first();
        if ($existingUser) {
            throw ValidationException::withMessages([
                'email' => 'The email address is already exists.',
            ]);
        }
        $user->syncRoles($request['role_id']);
        return $user->update($request);
    }
    public function delete($id)
    {
        $data = User::where('id', $id)->first();
        return $data->delete();
    }
    public function customersWithName($request)
    {
        $data = User::where('name', 'like', '%' . $request->searchuser . '%')
            ->where('role_id', 5)
            ->get();
        return $data;
    }
    public function userAdminWithName($request)
    {
        $data = User::where('name', 'like', '%' . $request->searchuser . '%')->where('role_id', '!=', 5)->get();

        return $data;
    }
}
