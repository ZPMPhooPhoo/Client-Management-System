<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Repository\Category\CategoryRepoInterface;
use App\Services\Category\CategoryServiceInterface;
use Exception;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $categoryRepo,$categoryService;
    public function __construct(CategoryRepoInterface $cataegoryRepo,CategoryServiceInterface $categoryService){
        $this->categoryRepo = $cataegoryRepo;
        $this->categoryService = $categoryService;
        // $this->middleware('permission:CategoryList', ['only' => 'index']);
        // $this->middleware('permission:CategoryCreate', ['only' => ['create', 'store']]);
        // $this->middleware('permission:CategoryEdit', ['only' => ['edit', 'update']]);
        // $this->middleware('permission:CategoryShow', ['only' => 'show']);
        // $this->middleware('permission:CategoryDelete', ['only' => 'destroy']);
        // $this->middleware('auth');
    }

    public function index()
    {
        try {
            $data = $this->categoryRepo->get();
            return response()->json([
                'status' => 'success',
                'message' => 'Category List!',
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
    public function store(CategoryRequest $request)
    {
        try {
            $data = $this->categoryService->store($request->validated());
            return response()->json([
                'status' => 'success',
                'message' => 'Category Created Successfully!',
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
            $data = $this->categoryRepo->show($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Category Show!',
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
    public function update(CategoryRequest $request, $id)
    {
        try {
            $data = $this->categoryService->update($request->validated(),$id);
            return response()->json([
                'status' => 'success',
                'message' => 'Category Updated Successfully!',
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
            $data = $this->categoryService->delete($id);
            return response()->json([
                'status' => 'success',
                'message' => 'Category Deleted Successfully!',
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

    public function categoriesByName(Request $request){
        try{
            $data=$this->categoryRepo->categoriesByName($request);
            return response()->json([
                'status'=>'success',
                'message'=>'Search Category By Name!',
                'data'=>$data
            ],200);

        }catch(Exception $e){
            return response()->json([
                'status'=>'error',
                'message'=>$e->getMessage(),
            ],500);
        }
    }
}
