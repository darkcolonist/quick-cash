<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Loanee;

class UserController extends Controller
{
    public function getUserList()
    {
        try
        {
            $users = User::orderBy('id', 'ASC')->get();
            return response()->json($users);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

    public function index()
    {
        return view('home');
    }

    public function addUserForm()
    {
        return view('home');
    }
}
