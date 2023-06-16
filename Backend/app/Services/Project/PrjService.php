<?php

namespace App\Services\Project;

use App\Models\Project;
use App\Services\Project\PrjServiceInterface;
use PDO;

class PrjService implements PrjServiceInterface
{
    public function store($request)
    {
        //$request['is_']=isset($request['is_agree']) ? 1:0;
        $data = Project::create($request);
        // $data = Project::create([
        //     'title' => $request['title'],
        //     'description' => $request['description'],
        //     'status' => $request['status'],
        //     'maintenance_active' => $request['maintenance_active'],
        //     'category_id' => $request['category_id'],
        // ]);

        $data->user()->attach($request['users']);
        return $data;
    }

    public function update($request, $id)
    {
        $project = Project::where('id', $id)->first();
        $data = $project->update($request);
        $userIds = $request['users'];
        $excludedUserId = $request['num_id'];

        $project->user()->sync($userIds, function ($query) use ($excludedUserId) {
            $query->whereNotIn('user_id', $excludedUserId);
        });
        return $data;
    }

    public function delete($id)
    {
        $data = Project::where('id', $id)->first();
        return $data->delete();
    }

    public function projectsActive($request)
    {
        $data = Project::where('maintenance_active', $request->maintain_active)->get();
        return $data;
    }
}
