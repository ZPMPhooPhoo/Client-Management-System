<?php

namespace App\Repository\Contract;

use App\Models\Contract;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ContractRepository implements ContractRepoInterface
{
    // public function get()
    // {
    //     $data = Contract::all();
    //     return $data;
    // }
    public function get()
    {
        $data = Contract::all();

        $contracts = $data->map(function ($contract) {
            return [
                'id' => $contract->id,
                'contract' => $contract->contract,
                'description' => $contract->description,
                'contract_date' => $contract->contract_date,
                'quotation_id' => $contract->quotation_id,
                'contract_url' => $contract->contract ? url("api/storage/contracts/{$contract->contract}") : null,
            ];
        });

        return $contracts;
    }


    // public function show($id)
    // {
    //     $data = Contract::where('id', $id)->first();
    //     return $data;
    //  }
    public function show($id)
    {
        $data = Contract::findOrFail($id);

        $contractData = [
            'contract' => $data->contract,
            'description' => $data->description,
            'contract_date' => $data->contract_date,
            'quotation_id' => $data->quotation_id,
            'contract_url' => $data->contract ? url("api/storage/contracts/{$data->contract}") : null
        ];

        return $contractData;
    }
}
