<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Role;
use App\Models\Company;
use App\Models\Loanee;
use App\Models\Configuration;

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

        Configuration::create(['setting' => 'Interest',
            'value' => '5']);
        Configuration::create(['setting' => 'Max Amortization Length',
            'value' => '3']);

        User::create([
            'name' => 'owner',//1
            'email' => 'owner@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => Role::all()->first()->id,
        ]);
        User::create([
            'name' => 'admin',//2
            'email' => 'admin@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => 2,
        ]);
        User::create([
            'name' => 'emp1',//3
            'email' => 'emp1@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => 4,
        ]);
        Loanee::create([
            'user_id' => 3, //emp1
            'company_id' => 1, //Company1
            'company_identification' => '1abc-65k1-0048-ab01',
        ]);

        User::create([
            'name' => 'pay',//4
            'email' => 'pay@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => 3,
        ]);
        Loanee::create([
            'user_id' => 4, //emp1
            'company_id' => 1, //Company1
            'company_identification' => '1abc-65k1-0048-ab01',
        ]);

        
        User::create([
            'name' => 'emp2',//5
            'email' => 'emp2@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => 4,
        ]);
        Loanee::create([
            'user_id' => 5, //emp1
            'company_id' => 2, //Company1
            'company_identification' => '1abc-65k1-0048-ab01',
        ]);
    }
}
