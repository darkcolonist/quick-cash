<?php

namespace App\Http\Controllers;

use DB;
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

    public function addUser(Request $request)
    {
        try
        {
            DB::table('users')->insert([
                'name' => $request->get('userName'),
                'email' => $request->get('userMail'),
                'password' => $request->get('userPass'),
                'role_id' => $request->get('userRole'),
            ]);
        }
        catch(Exception $e) {

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

    public function editUserForm()
    {
        return view('home');
    }
}
