<?php
namespace App\Services\Invoice;

use App\Models\Invoice;
use App\Services\Invoice\InvoiceServiceInterface;

class InvoiceService implements InvoiceServiceInterface
{
    public function store($request)
    {        
        return Invoice::create($request);
    }

    public function update($request, $id){
        $category = Invoice::where('id', $id)->first();
        return $category->update($request);
    }

    public function delete($id)
    {
        $data = Invoice::where('id', $id)->first();
        return $data->delete();
    }
}