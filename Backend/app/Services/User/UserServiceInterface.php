<?php

namespace App\Services\User;

interface UserServiceInterface 
{
    public function store($request);

    public function update($request ,$id);

    public function delete($id);

    public function customersWithName($request);

    public function userAdminWithName($request);
}