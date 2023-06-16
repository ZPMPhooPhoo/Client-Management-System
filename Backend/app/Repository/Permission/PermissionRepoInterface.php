<?php

namespace App\Repository\Permission;

interface PermissionRepoInterface
{
    public function get();

    public function show($id);
}
