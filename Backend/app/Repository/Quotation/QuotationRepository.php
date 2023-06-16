<?php

namespace App\Repository\Quotation;

use App\Models\Quotation;

use function PHPSTORM_META\map;

class QuotationRepository implements QuotationRepoInterface
{
    public function get()
    {
        $data = Quotation::all();

        $quotations = $data->map(function ($quotation) {
            return [
                'id' => $quotation->id,
                'quotation' => $quotation->quotation,
                'is_agree' => $quotation->is_agree,
                'quotation_date' => $quotation->quotation_date,
                'project_id' => $quotation->project_id,
                'quotation_url' => $quotation->quotation ? url("storage/quotations/{$quotation->quotation}") : null,
            ];
        });
        return $quotations;
    }

    public function show($project_id)
    {
        $quotations = Quotation::where('project_id', $project_id)->get();

        $result = $quotations->map(function ($quotation) {
            return [
                'id' => $quotation->id,
                'description' => $quotation->description,
                'quotation' => $quotation->quotation,
                'is_agree' => $quotation->is_agree,
                'quotation_date' => $quotation->quotation_date,
                'project_id' => $quotation->project_id,
                'quotation_url' => $quotation->quotation ? url("api/storage/quotations/{$quotation->quotation}") : null,
            ];
        });

        return $result;
    }
    public function quotation_edit($id)
    {
        $data = Quotation::where('id', $id)->first();
        return [
            'description' => $data->description,
            'quotation' => $data->quotation,
            'is_agree' => $data->is_agree,
            'quotation_date' => $data->quotation_date,
            'quotation_url' => $data->quotation ? url("storage/quotations/{$data->quotation}") : null,
        ];
    }
    public function contract_quotation($id)
    {
        $data = Quotation::with('contract')->where('project_id', $id)->get();
        $result = $data->map(function ($contract) {
            return [
                'description' => $contract->description,
                'contract' => $contract->contract,
                'contract_date' => $contract->contract_date,
                'contract_url' => $contract->contract ? url("api/storage/contracts/{$contract->contract->contract}") : null,
            ];
        });
        return $result;
    }
    // $transformedData = $data->map(function ($quotation) {
    //     $contractUrl = $quotation->contract ? url("api/storage/contracts/{$quotation->contract->contract}") : null;

    //     return [
    //         'contract' => $quotation->contract,
    //         'contract_date' => $quotation->contract_date,
    //         'description' => $quotation->description,
    //         'contract_url' => $contractUrl,
    //     ];
    // });

    // return $transformedData;
}
