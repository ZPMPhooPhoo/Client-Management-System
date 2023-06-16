<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContractRequest;
use App\Models\Contract;
use App\Repository\Contract\ContractRepoInterface;
use App\Services\Contract\ContractServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $contractRepo, $contractService;
    public function __construct(ContractRepoInterface $contractRepo, ContractServiceInterface $contractService)
    {
        $this->contractRepo = $contractRepo;
        $this->contractService = $contractService;
        // $this->middleware('permission:ContractList', ['only' => 'index']);
        // $this->middleware('permission:ContractCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:ContractEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:ContractShow', ['only' => 'show']);
        // $this->middleware('permission:ContractDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }

    public function index()
    {
        try {
            $data = $this->contractRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Contract List!',
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

    public function download($contract)
    {
        $filePath = 'public/contracts/' . $contract;

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
    public function store(ContractRequest $request)
    {
        try {
            $data = $this->contractService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Contract Created Successfully!',
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
            $data = $this->contractRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Contract Show!',
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
    public function update(ContractRequest $request, $id)
    {
        try {
            $data = $this->contractService->update($request->validated(), $id);
            return response()->json([
                'status' => 'success',
                'message' => 'Contract Updated Successfully!',
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
            $data = $this->contractService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Contract Deleted Successfully!',
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
