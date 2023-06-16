<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
     }
     
    public function index(){
        //$user = User::with('roles')->get
        return view('backend.index');
    }

    public function widget(){

        return view('backend.widgets');
    }

    public function datatable(){
        $client = new Client();
        $request = $client->get('https://api.publicapis.org/entries');
        if($request->getStatusCode() == 200){
            $response = json_decode($request->getBody());
            //dd($response->entries);
            $data = $response->entries;
        }
        return view('backend.datatable', compact('data'));
    }
}
