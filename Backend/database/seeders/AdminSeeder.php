<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadmin = User::create(
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@gmail.com',
                'password' => Hash::make('12345678'),
                'phone' => '09-123456789',
                'address' => 'Yangon',
                'contact_person' => 'contact',
                'position' => 'position',
                'role_id' => '1'
            ]
        );

        $admin = User::create(
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('12345678'),
                'phone' => '09-123456789',
                'address' => 'Yangon',
                'contact_person' => 'contact',
                'position' => 'position',
                'role_id' => '2'
            ]
        );

        $manager = User::create([
            'name' => 'Manager',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('12345678'),
            'phone' => '09-123456789',
            'address' => 'Yangon',
            'contact_person' => 'contact',
            'position' => 'position',
            'role_id' => '3'
        ]);

        $developer = User::create([
            'name' => 'Developer',
            'email' => 'developer@gmail.com',
            'password' => Hash::make('12345678'),
            'phone' => '09-123456789',
            'address' => 'Yangon',
            'contact_person' => 'contact',
            'position' => 'position',
            'role_id' => '4'
        ]);



        $superadmin->assignRole('SuperAdmin');
        $admin->assignRole('Admin');
        $manager->assignRole('Manager');
        $developer->assignRole('Developer');
    }
}
