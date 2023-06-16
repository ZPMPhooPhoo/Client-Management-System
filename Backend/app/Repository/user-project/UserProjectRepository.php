<?php
    namespace App\Repository\UserProject;
    use App\Models\UserProject;
    use App\Models\User;
use Illuminate\Support\Facades\DB;

    class UserProjectRepository implements UserProjectInterface{
        public function show($id){
             $data = UserProject::with('project')->where('user_id' , $id)->get();

            // $user = User::find($id);
            // foreach ($user->project as $prj) {
            //     $prj->pivot->user_projects;
            // }

            // $data = User::all();
            // $data = DB::table('user_projects')
            // ->where('user_id', 5)
            // ->value('project_id');

            return $data;
        }
    }




?>
