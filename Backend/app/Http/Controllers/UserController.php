<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(){
        $this->middleware('permission:userList', ['only' => 'index']);
        $this->middleware('permission:userCreate', ['only' => ['create', 'store']]);
        $this->middleware('permission:userEdit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:userShow', ['only' => 'show']);
        $this->middleware('permission:userDelete', ['only' => 'destroy']);
        $this->middleware('auth');
     }
    public function index()
    {
        $data = User::all();
        return view('backend.user.index', compact('data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Role::pluck('name','name')->all();
        return view('backend.user.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        // try {
        //     $data = $request->validated();
        //     DB::beginTransaction();
        //     // $result = array_merge($data, ['name' => 'phoomon', 'email' => 'phoomon@gmail.com', 'password' => Hash::make('admin@123'),'roles' =>1]);
        //     // $user = User::create($result);
        //     //DB::commit();

        //     $user = User::create([
        //         'name' => $data['name'],
        //         'email' => $data['email'],
        //         'password' => Hash::make($data['password'])      
        //     ]);
        //     $user->assignRole($request->validated('roles'));

        //     DB::commit();
        // } catch (Exception $e) {
        //     DB::rollBack();
        //     Log::channel('web_daily_error')->error("Admin Create", [$e->getMessage(), $e->getCode()]);
        //     return Redirect::back()->withErrors($e->getMessage());
        // }
        
        try {
            DB::transaction(function() use($request)
            {
                $data = $request->validated();
                $data['password'] = Hash::make($data['password']);
                $data['phone'] = ['09-123456789'];
                $data['address'] = ['Yangon'];
                $data['contact_person'] = ['Contact'];
                $data['position'] = ['Position'];
                $user = User::create($data);
                $user->assignRole($data['role_id']);
                
            });
        } catch (Exception $e) {
            Log::channel('web_daily_error')->error("Admin Create", [$e->getMessage(), $e->getCode()]);
            return Redirect::back()->withErrors($e->getMessage());
        }
        return redirect()->route('user.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = User::where('id', $id)->first();
        //$decrypt= bcrypt($data->password);
        //$decrypt= Hash::check($data->password);
        //dd($decrypt);
        $roles = Role::get();
        $userRole = $data->roles->pluck('name')->toArray();
        return view('backend.user.edit',compact('data','roles','userRole'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        $user = $request->validated();
        //dd($user);
        // $input = $request->all();
        // if(!empty($input['password'])){ 
        //     $input['password'] = Hash::make($input['password']);
        // }else{
        //     $input = Arr::except($input,array('password'));
        // }
        $user = User::where('id', $id)->first();

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            //'password' => Hash::make($request->password)
            'password' => $request->password,
            'phone' => '09-123456789',
            'address'=> 'Yangon',
            'contact_person'=>'contact',
            'position'=>'position',
            'role_id'=> $request->role_id
        ]);

        $user->syncRoles($request->validated('role_id'));
        return redirect()->route('user.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = User::where('id', $id)->first();
        $data->delete();
        return redirect()->route('user.index');
    }
}
