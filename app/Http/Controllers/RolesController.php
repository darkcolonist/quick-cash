<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RolesController extends Controller
{
    public function getRoleList() {
        try
        {
            $roles = Role::orderBy('id', 'ASC')->get();
            return response()->json($roles);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }
}
