<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuotationRequest;
use App\Models\Quotation;
use App\Repository\Quotation\QuotationRepoInterface;
use App\Services\Quotation\QuotationServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $quotationRepo, $quotationService;
    public function __construct(QuotationRepoInterface $quotationRepo, QuotationServiceInterface $quotationService)
    {
        $this->quotationRepo = $quotationRepo;
        $this->quotationService = $quotationService;
        // $this->middleware('permission:QuotationList', ['only' => 'index']);
        // $this->middleware('permission:QuotationCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:QuotationEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:QuotationShow', ['only' => 'show']);
        // $this->middleware('permission:QuotationDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }

    public function index()
    {
        try {
            $data = $this->quotationRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation List!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    public function download($quotation)
    {
        $filePath = 'public/quotations/' . $quotation;

        if (Storage::exists($filePath)) {
            return Storage::download($filePath);
        }

        abort(404, 'File not found.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(QuotationRequest $request)
    {
        try {
            $data = $this->quotationService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation Created Successfully!',
                'data' => $data->id
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),

            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = $this->quotationRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation Show!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(QuotationRequest $request, $id)
    {
        try {
            $data = $this->quotationService->update($request->validated(), $id);
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation Updated Successfully!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = $this->quotationService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation Deleted Successfully!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function quotation_edit($id)
    {
        try {
            $data = $this->quotationRepo->quotation_edit($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation Edit Data!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function contract_quotation($id)
    {
        try {
            $data = $this->quotationRepo->contract_quotation($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Quotation Contract Data!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
