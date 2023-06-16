<?php

namespace App\Services\Quotation;
// use Carbon\Carbon;
// use Exception;
use App\Models\Quotation;
use App\Services\Quotation\QuotationServiceInterface;
use Illuminate\Support\Facades\Storage;

class QuotationService implements QuotationServiceInterface
{
    public function store($request)
    {

        if (isset($request['quotation'])) {
            $extension = $request['quotation']->getClientOriginalExtension();

            $allowedExtensions = ['jpeg', 'jpg', 'png', 'pdf'];

            if (!in_array($extension, $allowedExtensions)) {
                return false; // or handle the invalid file extension error in an appropriate way
            }

            $fileName = $request['quotation']->getClientOriginalName();
            $request['quotation']->storeAs('public/quotations', $fileName);
            $request['quotation'] = $fileName;
            $request['is_agree'] = isset($request['is_agree']) ? 1 : 0;

            $data = Quotation::create([
                'quotation' => $request['quotation'],
                'description' => $request['description'],
                'is_agree' => $request['is_agree'],
                'quotation_date' => $request['quotation_date'],
                'project_id' => $request['project_id'],
            ]);
            return $data;
        }
    }

    public function update($request, $id)
    {
        $quotation = Quotation::where('id', $id)->first();
        if (isset($request['quotation'])) {
            $extension = $request['quotation']->getClientOriginalExtension();
            $allowedExtensions = ['jpeg', 'jpg', 'png', 'pdf'];

            if (!in_array($extension, $allowedExtensions)) {
                return false; // or handle the invalid file extension error in an appropriate way
            }

            $fileName = $request['quotation']->getClientOriginalName();
            $request['quotation']->storeAs('public/quotations', $fileName);

            $request['quotation'] = $fileName;
            $request['is_agree'] = isset($request['is_agree']) ? 1 : 0;
        }
        return $quotation->update($request);
    }

    public function delete($id)
    {
        $quotation = Quotation::findOrFail($id);

        if (!empty($quotation->quotation)) {
            Storage::delete('public/quotations/' . $quotation->quotation);
        }

        $quotation->delete();

        return true;
    }
}
