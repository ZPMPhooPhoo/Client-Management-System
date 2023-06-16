<?php

namespace App\Repository\Receipt;
use App\Models\Receipt;

class ReceiptRepository implements ReceiptRepoInterface
{
    public function get()
    {
        $data = Receipt::all();
        return $data;
    }

    public function show($id)
    {
        $data = Receipt::where('id', $id)->first();
        return $data;
    }
}