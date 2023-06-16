<?php

namespace App\Services\Invoice;

interface InvoiceServiceInterface
{
    public function store($request);

    public function update($request,$id);
    
    public function delete($id);
}