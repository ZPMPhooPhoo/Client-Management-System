<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $super_admin = Role::create(['name' => 'SuperAdmin']);
        $admin = Role::create(['name' => 'Admin']);
        $manager = Role::create(['name' => 'Manager']);
        $developer = Role::create(['name' => 'Developer']);
        $customer = Role::create(['name' => 'Customer']);

        $dashboard = Permission::create(['name' => 'dashboard']);
        $widget = Permission::create(['name' => 'widget']);

        $admin_list = Permission::create(['name' => 'adminList']);
        $permission_list = Permission::create(['name' => 'permissionList']);
        $permission_create = Permission::create(['name' => 'permissionCreate']);
        $permission_edit = Permission::create(['name' => 'permissionEdit']);
        $permission_show = Permission::create(['name' => 'permissionShow']);
        $permission_delete = Permission::create(['name' => 'permissionDelete']);

        $role_list = Permission::create(['name' => 'roleList']);
        $role_create = Permission::create(['name' => 'roleCreate']);
        $role_edit = Permission::create(['name' => 'roleEdit']);
        $role_show = Permission::create(['name' => 'roleShow']);
        $role_delete = Permission::create(['name' => 'roleDelete']);

        $category_list = Permission::create(['name' => 'category-lists']);
        $category_create = Permission::create(['name' => 'category-create']);
        $category_edit = Permission::create(['name' => 'category-edit']);
        $category_delete = Permission::create(['name' => 'category-delete']);
        $contract_create = Permission::create(['name' => 'contract-create']);
        $contract_edit = Permission::create(['name' => 'contract-edit']);
        $quotation = Permission::create(['name' => 'quotation']);
        $quotation_create = Permission::create(['name' => 'quotation-create']);
        $quotation_edit = Permission::create(['name' => 'quotation-edit']);
        $user = Permission::create(['name' => 'users']);
        $user_create = Permission::create(['name' => 'user-create']);
        $user_edit = Permission::create(['name' => 'user-edit']);
        $user_delete = Permission::create(['name' => 'user-delete']);
        $user_profile = Permission::create(['name' => 'user-profile']);
        $client_lists = Permission::create(['name' => 'client-lists']);
        $client_project_lists = Permission::create(['name' => 'client-project-lists']);
        $projects = Permission::create(['name' => 'projects']);
        $project_edit = Permission::create(['name' => 'project-edit']);
        $project_detail = Permission::create(['name' => 'project-detail']);
        $add_client_project = Permission::create(['name' => 'add-client-project']);
        $services = Permission::create(['name' => 'services']);
        $client_create = Permission::create(['name' => 'client-create']);
        $client_edit = Permission::create(['name' => 'client-edit']);
        $client_delete = Permission::create(['name' => 'client-delete']);

        $super_admin->givePermissionTo([$dashboard,  $widget, $admin_list, $permission_list, $permission_create, $permission_edit, $permission_show, $permission_delete, $role_list, $role_create, $role_edit, $role_show, $role_delete, $category_list, $category_create, $category_edit, $category_delete, $contract_create, $contract_edit, $quotation, $quotation_create, $quotation_edit, $user, $user_create, $user_edit, $user_delete, $user_profile, $client_lists, $client_project_lists, $projects, $project_edit, $project_detail, $add_client_project, $services, $client_create, $client_edit, $client_delete]);

        $admin->givePermissionTo([$dashboard,  $widget, $admin_list, $permission_list, $permission_create, $permission_edit, $permission_show, $permission_delete, $role_list, $role_create, $role_edit, $role_show, $role_delete, $category_list, $category_create, $category_edit, $category_delete, $contract_create, $contract_edit, $quotation, $quotation_create, $quotation_edit, $user, $user_create, $user_edit, $user_delete, $user_profile, $client_lists, $client_project_lists, $projects, $project_edit, $project_detail, $add_client_project, $services, $client_create, $client_edit, $client_delete]);

        $manager->givePermissionTo([$dashboard,  $widget, $admin_list, $permission_list, $permission_create, $permission_edit, $permission_show, $permission_delete, $role_list, $role_create, $role_edit, $role_show, $role_delete, $category_list, $category_create, $category_edit, $category_delete, $contract_create, $contract_edit, $quotation, $quotation_create, $quotation_edit, $user, $user_create, $user_edit, $user_delete, $user_profile, $client_lists, $client_project_lists, $projects, $project_edit, $project_detail, $add_client_project, $services, $client_create, $client_edit, $client_delete]);

        $developer->givePermissionTo([$dashboard,  $widget, $admin_list, $permission_list, $permission_create, $permission_edit, $permission_show, $permission_delete, $role_list, $role_create, $role_edit, $role_show, $role_delete, $category_list, $client_lists, $client_project_lists, $projects, $project_detail, $services]);

        $customer->givePermissionTo([]);
    }
}
