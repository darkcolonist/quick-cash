<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;
use App\Models\Company;
use App\Models\Configurations;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            'Level 4',
            'Level 3',
            'Level 2',
            'Level 1',
        ];
        foreach ($roles as $role) {
            Role::create([
                'name' => $role
            ]);
        }

        $companies = [
            'Company 1',
            'Big Corp',
            'Medium Business',
            'Local Establishment',
        ];
        foreach ($companies as $company) {
            Company::create([
                'name' => $company
            ]);
        }

        Configurations::create(['setting' => 'Interest',
            'value' => '5']);
            Configurations::create(['setting' => 'Max Amortization Length',
            'value' => '3']);

        User::create([
            'name' => 'test',
            'email' => 'test@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => Role::all()->first()->id,
        ]);
    }
}
