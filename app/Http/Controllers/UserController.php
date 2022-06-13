<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Loanee;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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

    public function getUsersSession()
    {
        $user = User::whereId(Auth::id())->first();
        return $user;
    }

    public function addUser(Request $request)
    {
        try
        {
            $data = new User;
            $data->name = $request->get('userName');
            $data->email = $request->get('userMail');
            $data->password = Hash::make($request->get('userPass'));
            $data->role_id = $request->get('userRole');
            $data->save();
            $id = $data->id;
            DB::table('loanees')->insert([
                'user_id' => $id,
                'company_id' => $request->get('userCompany'),
            ]);
        }
        catch(Exception $e) {
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

    public function editUserForm()
    {
        return view('home');
    }

    public function getUserRecord($id)
    {
        try
        {
            $user = User::whereId($id)->first();
            return $user;
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }
}
