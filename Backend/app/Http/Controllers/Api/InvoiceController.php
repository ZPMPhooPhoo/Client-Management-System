<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InvoiceRequest;
use App\Models\Invoice;
use App\Repository\Invoice\InvoiceRepoInterface;
use App\Services\Invoice\InvoiceServiceInterface;
use Exception;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $invoiceRepo,$invoiceService;
    public function __construct(InvoiceRepoInterface $invoiceRepo,InvoiceServiceInterface $invoiceService){
        $this->invoiceRepo = $invoiceRepo;
        $this->invoiceService = $invoiceService;
        // $this->middleware('permission:InvoiceList', ['only' => 'index']);
        // $this->middleware('permission:InvoiceCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:InvoiceEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:InvoiceShow', ['only' => 'show']);
        // $this->middleware('permission:InvoiceDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }

    public function index()
    {
        try {
            $data = $this->invoiceRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Invoice List!',
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InvoiceRequest $request)
    {
        try {
            $data = $this->invoiceService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Invoice Created Successfully!',
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = $this->invoiceRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Invoice Show!',
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(InvoiceRequest $request, $id)
    {
        try {
            $data = $this->invoiceService->update($request->validated(),$id);
            return response()->json([
                'status' => 'success',
                'message' => 'Invoice Updated Successfully!',
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = $this->invoiceService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Invoice Deleted Successfully!',
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
}
