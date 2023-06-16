<?php

namespace App\Http\Controllers;

use App\Http\Requests\PermissionRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function __construct(){
        $this->middleware('permission:permissionList', ['only' => 'index']);
        $this->middleware('permission:permissionCreate', ['only' => ['create', 'store']]);
        $this->middleware('permission:permissionEdit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:permissionShow', ['only' => 'show']);
        $this->middleware('permission:permissionDelete', ['only' => 'destroy']);
        $this->middleware('auth');
     }

    public function index()
    {
        $data = Permission::all();
        return view('backend.permission.index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('backend.permission.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionRequest $request)
    {
        Permission::create($request->validated());
        return redirect()->route('permission.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Permission::where('id', $id)->first();
        return view('backend.permission.show', compact('data'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = Permission::where('id', $id)->first();
        return view('backend.permission.edit',compact('data'));
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
        $data = Permission::where('id', $id)->first();
        $data->update($request->validated());
        return redirect()->route('permission.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = Permission::where('id', $id)->first();
        $data->delete();
        return redirect()->route('permission.index'); 
    }
}
