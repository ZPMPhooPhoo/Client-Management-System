<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct(){
        $this->middleware('permission:roleList', ['only' => 'index']);
        $this->middleware('permission:roleCreate', ['only' => ['create', 'store']]);
        $this->middleware('permission:roleEdit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:roleShow', ['only' => 'show']);
        $this->middleware('permission:roleDelete', ['only' => 'destroy']);
        $this->middleware('auth');
     }

    public function index()
    {
        $data = Role::all();
        return view('backend.role.index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $data = Permission::all();
        return view('backend.role.create', compact('data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $role = Role::create($request->validated());
        $role->syncPermissions($request->input('permission_arr'));
        return redirect()->route('role.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Role::where('id', $id)->first();
        return view('backend.role.show',compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Role::where('id', $id)->first();
        $permission = Permission::get();
        // $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id",$id)
        //     ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
        //     ->all();
        $rolePermissions = $data->permissions->pluck('id')->toArray();
        //dd($rolePermissions);
        return view('backend.role.edit',compact('data','permission','rolePermissions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = Role::where('id', $id)->first();
        $data->syncPermissions($request->get('permission_arr'));
        //$data->update($request->validated());
        $data->update($request->all());
        return redirect()->route('role.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Role::where('id', $id)->first();
        $data->delete();
        return redirect()->route('role.index');
    }
}
