<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Repository\Permission\PermissionRepoInterface;
use App\Services\Permission\PermissionServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $permissionRepo,$permissionService;
    public function __construct(PermissionRepoInterface $permissionRepo,PermissionServiceInterface $permissionService)
    {
        $this->permissionRepo = $permissionRepo;
        $this->permissionService = $permissionService;
        // $this->middleware('permission:PermissionList', ['only' => 'index']);
        // $this->middleware('permission:PermissionCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:PermissionEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:PermissionShow', ['only' => 'show']);
        // $this->middleware('permission:PermissionDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }
    public function index()
    {
        try {
            $data = $this->permissionRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Permission List!',
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
    public function store(PermissionRequest $request)
    {
        try {
            $data = $this->permissionService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Permission Created Successfully!',
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
            $data = $this->permissionRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Permission Show!',
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
    public function update(PermissionRequest $request, $id)
    {
        try {
            $data = $this->permissionService->update($request->validated(),$id);
            return response()->json([
                'status' => 'success',
                'message' => 'Permission Updated Successfully!',
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
            $data = $this->permissionService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Permission Deleted Successfully!',
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
