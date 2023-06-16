<?php

namespace App\Repository\Contract;

interface ContractRepoInterface
{
    public function get();
    public function show($id);
}
