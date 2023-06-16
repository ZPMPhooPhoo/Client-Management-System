<?php
    namespace App\Repository\User;

    interface UserRepoInterface
    {
        public function get();
        public function show($id);
        public function customers();
        public function customersByMonth();
        public function developers();
        public function developer_project($project_id);

    }
?>
