<?php

namespace App\Services\Contract;

interface ContractServiceInterface
{
    public function store($request);

    public function update($request,$id);
    
    public function delete($id);
}