<?php

namespace App\Services\Receipt;

interface ReceiptServiceInterface
{
    public function store($request);

    public function update($request,$id);
    
    public function delete($id);
}