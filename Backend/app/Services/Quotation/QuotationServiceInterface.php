<?php

namespace App\Services\Quotation;

interface QuotationServiceInterface
{
    public function store($request);

    public function update($request,$id);

    public function delete($id);
}
