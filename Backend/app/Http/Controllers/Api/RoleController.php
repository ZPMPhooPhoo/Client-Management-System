<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Repository\Role\RoleRepoInterface;
use App\Services\Role\RoleServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $roleRepo,$roleService;
    public function __construct(RoleRepoInterface $roleRepo,RoleServiceInterface $roleService){
        $this->roleRepo = $roleRepo;
        $this->roleService = $roleService;
        // $this->middleware('permission:RoleList', ['only' => 'index']);
        // $this->middleware('permission:RoleCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:RoleEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:RoleShow', ['only' => 'show']);
        // $this->middleware('permission:RoleDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }

    public function index()
    {
        try {
            $data = $this->roleRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Role List!',
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
    public function store(RoleRequest $request)
    {
        try {
            $data = $this->roleService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Role Created Successfully!',
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
            $data = $this->roleRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Role Show!',
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
    public function update(RoleRequest $request, $id)
    {
        try {
            $data = $this->roleService->update($request->validated(),$id);
            return response()->json([
                'status' => 'success',
                'message' => 'Role Updated Successfully!',
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
            $data = $this->roleService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Role Deleted Successfully!',
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

    public function user_role()
    {
        try {
            $data = $this->roleRepo->user_role();
            return response()->json([
                'status' => 'success',
                'message' => 'Role List!',
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
