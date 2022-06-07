<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
    }
}
