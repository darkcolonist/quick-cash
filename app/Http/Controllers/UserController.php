<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Loanee;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getUserList($id)
    {
        try
        {
            $users = '';
            $userids = [];
            $requestor = User::whereId($id)->first();
            if ($requestor->role_id == 3) {
                $company = Loanee::where('user_id', $id)->first();
                $loanees = Loanee::where('company_id', $company->company_id)
                    ->orderBy('id', 'ASC')
                    ->get();
                foreach ($loanees as $loanee) {
                    array_push($userids, $loanee->user_id);
                }
                $users = User::whereIn('id', $userids)
                    ->orderBy('id', 'ASC')->get();
            } else {
                $users = User::orderBy('id', 'ASC')->get();
            }
            
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
        $loanee = Loanee::where('user_id', $user->id)->first();
        if ($loanee != null) {
            $company = Company::whereId($loanee->company_id)->first();
            $user->loanee = $loanee;
            if ($company != null) {
                $user->company = $company;
            }
        }
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

    public function getLoaneeRecord($id)
    {
        try
        {
            $loanee = Loanee::where('user_id', $id)->first();
            return $loanee;
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }
}
