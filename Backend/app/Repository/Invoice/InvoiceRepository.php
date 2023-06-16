<?php

namespace App\Repository\Invoice;
use App\Models\Invoice;

class InvoiceRepository implements InvoiceRepoInterface
{
    public function get()
    {
        $data = Invoice::all();
        return $data;
    }

    public function show($id)
    {
        $data = Invoice::where('id', $id)->first();
        return $data;
    }
}