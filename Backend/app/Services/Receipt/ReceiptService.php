<?php
namespace App\Services\Receipt;

use App\Models\Receipt;
use App\Services\Receipt\ReceiptServiceInterface;

class ReceiptService implements ReceiptServiceInterface
{
    public function store($request)
    {        
        return Receipt::create($request);
    }

    public function update($request, $id){
        $receipt = Receipt::where('id', $id)->first();
        return $receipt->update($request);
    }

    public function delete($id)
    {
        $data = Receipt::where('id', $id)->first();
        return $data->delete();
    }
}