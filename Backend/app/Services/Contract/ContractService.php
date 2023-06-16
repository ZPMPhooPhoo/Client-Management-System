<?php
namespace App\Services\Contract;

use App\Models\Contract;
use App\Services\Contract\ContractServiceInterface;
use Illuminate\Support\Facades\Storage;

class ContractService implements ContractServiceInterface
{
    public function store($request)
    {
        if(isset($request['contract']))
        {
            $extension=$request['contract']->getClientOriginalExtension();
            $allowedExtensions=['jpeg','jpg','png','pdf'];

            if(!in_array($extension,$allowedExtensions))
            {
                return false;
            }

         $fileName=$request['contract']->getClientOriginalName();
           // $request['contract']->storeAs('contracts',$fileName);

           $request['contract']->storeAs('public/contracts', $fileName);

          $request['contract']=$fileName;
        }

        $data=Contract::create([
            'contract'=>$request['contract'],
            'description'=>$request['description'],
            'contract_date'=>$request['contract_date'],
            'quotation_id' => $request['quotation_id'],
        ]);

        //$data = Contract::create($request);
        return $data;
    }

    // public function update($request, $id){
    //     $contract = Contract::where('id', $id)->first();

    //     if (!$contract) {
    //         return false; // Contract not found
    //     }

    //     if(isset($request['contract']))
    //     {
    //         $extension=$request['contract']->getClientOriginalExtension();
    //         $allowedExtensions=['jpeg','jpg','png','pdf'];
    //         if(!in_array($extension,$allowedExtensions))
    //         {
    //           return false;
    //         }

    //         $fileName=$request['contract']->getClientOriginalName();
    //         $request['contract']->storeAs('contracts',$fileName);
    //         $request['contract']=$fileName;

    //     }

    //     $contract->update([
    //         'contract' => $request['contract'],
    //         'description' => $request['description'],
    //         'contract_date' => $request['contract_date'],
    //         'quotation_id' => $request['quotation_id'],
    //     ]);

    //     return $contract;
    // }
    public function update($request, $contractId)
{
    $contract = Contract::find($contractId);

    if (!$contract) {
        return false; // Contract not found
    }

    if (isset($request['contract'])) {
        $extension = $request['contract']->getClientOriginalExtension();
        $allowedExtensions = ['jpeg', 'jpg', 'png', 'pdf'];

        if (!in_array($extension, $allowedExtensions)) {
            return false; // Invalid file extension
        }

        $fileName = $request['contract']->getClientOriginalName();
        $request['contract']->storeAs('public/contracts', $fileName);

        $request['contract'] = $fileName;
    }

    $contract->update([
        'contract' => $request['contract'],
        'description' => $request['description'],
        'contract_date' => $request['contract_date'],
        'quotation_id' => $request['quotation_id'],
    ]);

    return $contract;
}


    public function delete($id)
    {
        $contract = Contract::Find($id);

        if (!$contract) {
            return false; // Contract not found
        }

        // Delete the associated file from storage
        if ($contract->contract) {
            Storage::delete('public/contracts/' . $contract->contract);
        }

        $contract->delete();

        return true;
    }
}
