<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Repository\User\UserRepoInterface;
use App\Services\User\UserServiceInterface;
use Exception;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userRepo, $userService;
    public function __construct(UserRepoInterface $userRepo, UserServiceInterface $userService)
    {
        $this->userRepo = $userRepo;
        $this->userService = $userService;
        // $this->middleware('permission:UserList', ['only' => 'index']);
        // $this->middleware('permission:UserCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:UserEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:UserShow', ['only' => 'show']);
        // $this->middleware('permission:UserDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = $this->userRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'User List!',
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        try {
            $data = $this->userService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'User Created Successfully!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function customersWithName(Request $request)
    {
        try {
            $data = $this->userService->customersWithName($request);
            return response()->json([
                'status' => 'success',
                'message' => 'Search Customers By Name!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function userAdminWithName(Request $request)
    {
        try {
            $data = $this->userService->userAdminWithName($request);
            return response()->json([
                'status' => 'success',
                'message' => 'your search name is already taken',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'yourn search name is not correct',
            ], 500);
        };
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
            $data = $this->userRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => "User Show!",
                'data' => $data,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**$post->tag()->attach($request->tags);
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
        try {
            $data = $this->userService->update($request->validated(), $id);
            return response()->json([
                'status' => 'success',
                'message' => "User Updated Successfully!",
                'data' => $data,
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
            $data = $this->userService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'User Deleted Successfully!',
                'data' => $data,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function customers()
    {
        try {

            $data = $this->userRepo->customers();
            return response()->json([
                'status' => 'Success',
                'message' => 'Customer List!',
                'data' => $data

            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    public function developers()
    {
        try {

            $data = $this->userRepo->developers();
            return response()->json([
                'status' => 'Success',
                'message' => 'Developer List!',
                'data' => $data

            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    function developer_project($id)
    {
        try {
            $data = $this->userRepo->developer_project($id);
            return response()->json([
                'status' => 'success',
                'message' => 'All Developers related to pjID Successfully!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function customersByMonth()
    {
        try {
            $data = $this->userRepo->customersByMonth();
            return response()->json([
                'status' => 'Success',
                'message' => 'Customer By Month Successfully!',
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
