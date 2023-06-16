<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email',
                    'password' => 'required|confirmed',
                    'role_id' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $existingUser = User::where('email', $request->email)->first();

            if ($existingUser) {
                return response()->json([
                    'status' => false,
                    'message' => 'The email address is already exists.',
                ], 409);
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => '09-123456789',
                'address' => 'ygn',
                'contact_person' => 'contact',
                'position' => 'position',
                'role_id' => $request->role_id
            ]);
            $user->syncRoles($request['role_id']);

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully!',
                //'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
    public function userUpdate(Request $request, $id)
    {
        try {
            $user = User::where('id', $id)->first();
            $validateUser = Validator::make(
                $request->all(),
                [
                    'name' => 'required',
                    'email' => 'required|email',
                    'role_id' => 'required'
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            $existingUser = User::where('email', $request->email)->where('id', '!=', $id)->first();

            if ($existingUser) {
                return response()->json([
                    'status' => false,
                    'message' => 'The email address is already exists.',
                ], 409);
            }

            // $user = User::updated([
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = "09912345679";
            $user->address = 'ygn';
            $user->contact_person = 'contact';
            $user->position = 'position';
            $user->role_id = $request->role_id;

            $user->syncRoles($request['role_id']);
            $user->update();

            return response()->json([
                'status' => true,
                'message' => 'User Created Successfully!',
                // 'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function signin(Request $request)
    {
        try {
            $validateUser = Validator::make(
                $request->all(),
                [
                    'email' => 'required|email',
                    'password' => 'required',
                ]
            );

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if (!Auth::guard('web')->attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'User Logged In Successfully!',
                'role_id' => $user->role_id,
                'name' => $user->name,
                'id' => $user->id,
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function Logout(Request $request)
    {

        Auth::logout();
        return response()->json(['message' => 'logout successfully'], 200);
    }
}
