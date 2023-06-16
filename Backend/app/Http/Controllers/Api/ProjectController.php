<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\project;
use App\Repository\Project\PrjRepoInterface;
use App\Services\Project\PrjServiceInterface;
use Exception;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $prjRepo,$prjService;
    public function __construct(PrjRepoInterface $prjRepo,PrjServiceInterface $prjService){
        $this->prjRepo = $prjRepo;
        $this->prjService = $prjService;
        // $this->middleware('permission:ProjectList', ['only' => 'index']);
        // $this->middleware('permission:ProjectCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:ProjectEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:ProjectShow', ['only' => 'show']);
        // $this->middleware('permission:ProjectDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }

    public function index()
    {
        try {
            $data = $this->prjRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Project List!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function PrjChart(){
        try{
            $data=$this->prjRepo->prj_chart();
            return response()->json([
                'status'=> 'success',
                'message'=> 'Project By Month Chart Data Successfully',
                'data'=>$data
            ],200);

        }catch(Exception $e){
            return response()->json([
                'status' =>'error',
                'message' => $e->getMessage(),
            ],500);

        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProjectRequest $request)
    {
        try {
            $data = $this->prjService->store($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Project Created Successfully!',
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $data = $this->prjRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Project Show!',
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProjectRequest $request, $id)
    {
        try {
            $data = $this->prjService->update($request->validated(),$id);
            return response()->json([
                'status' => 'success',
                'message' => 'Project Updated Successfully!',
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = $this->prjService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Project Deleted Successfully!',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    // public function projectsActive(Request $request){
    //     try{
    //         $data = $this->prjService->projectsActive($request);
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Project maintain Successfully!',
    //             'data' => $data
    //         ], 200);
    //     }catch(Exception $e){
    function user_project($id){
        try{
            $data = $this->prjRepo->user_project($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Project Deleted Successfully!',
                'data' => $data
            ], 200);
        }catch (Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}


