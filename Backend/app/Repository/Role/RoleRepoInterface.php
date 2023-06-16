<?php

namespace App\Repository\Role;

interface RoleRepoInterface
{
    public function get();
    public function show($id);

    public function user_role();
}