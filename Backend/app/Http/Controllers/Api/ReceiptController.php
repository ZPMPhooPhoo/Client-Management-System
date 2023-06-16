<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReceiptRequest;
use App\Models\Receipt;
use App\Repository\Receipt\ReceiptRepoInterface;
use App\Services\Receipt\ReceiptServiceInterface;
use Exception;
use Illuminate\Http\Request;

class ReceiptController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $receiptRepo,$receiptService;
    public function __construct(ReceiptRepoInterface $receiptRepo,ReceiptServiceInterface $receiptService){
        $this->receiptRepo = $receiptRepo;
        $this->receiptService = $receiptService;
        // $this->middleware('permission:ReceiptList', ['only' => 'index']);
        // $this->middleware('permission:ReceiptCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:ReceiptEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:ReceiptShow', ['only' => 'show']);
        // $this->middleware('permission:ReceiptDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }
    public function index()
    {
        try {
            $data = $this->receiptRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Receipt List!',
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
    public function store(ReceiptRequest $request)
    {
        try {
            $data = $this->receiptService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Receipt Created Successfully!',
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
            $data = $this->receiptRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Receipt Show!',
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
    public function update(ReceiptRequest $request, $id)
    {
        try {
            $data = $this->receiptService->update($request->validated(),$id);
            return response()->json([
                'status' => 'success',
                'message' => 'Receipt Updated Successfully!',
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
            $data = $this->receiptService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Receipt Deleted Successfully!',
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
