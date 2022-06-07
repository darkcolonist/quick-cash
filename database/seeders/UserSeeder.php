<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'test',
            'email' => 'test@mail.com',
            'password' => '$2y$10$Rknx6gU0b92OMIKLogrJwuLdl.dPfgt9NuOk/Z6kR21kNoqAvJ7hO',
            'role_id' => 7
        ]);
    }
}
