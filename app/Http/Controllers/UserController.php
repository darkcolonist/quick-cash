<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use DB;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Loanee;
use App\Models\Company;
use App\Models\LoanHistory;
use App\Models\Loan;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function newUserForm()
    {
        return view('home');
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
            if (!$request->get('userCompany')) {
                return $data->id;
            } else {
                DB::table('loanees')->insert([
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'user_id' => $id,
                    'company_id' => $request->get('userCompany'),
                    'company_identification' => $request->get('userCompanyID'),
                ]);
            }
        }
        catch(Exception $e) {
            Log::error($e);
        }
    }

    public function addLoanee(Request $request)
    {
        try
        {
            $user = User::whereId(Auth::id())->first();
            $loanee = new Loanee;
            $loanee->user_id = $user->id;
            $loanee->company_id = $request->get('userCompany');
            $loanee->company_identification = $request->get('userCompanyID');
            $loanee->save();
        }
        catch(Exception $e)
        {
            return redirect('/home');
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

    public function editUser(Request $request)
    {
        $user = User::whereId($request->get('id'))
            ->update([
                'name' => $request->get('userName'),
                'email' => $request->get('userMail'),
                'role_id' => $request->get('userRole'),
            ]);
        if ($request->get('userPass') != '') {
            $user = User::whereId($request->get('id'))
            ->update([
                'password' => Hash::make($request->get('userPass'))
            ]);
        }

        $loanee = Loanee::where('user_id', $request->get('id'))->first();
        if ($loanee != null) {
            $loanee = Loanee::whereId($loanee->id)
                ->update([
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                    'company_id' => $request->get('userCompany'),
                    'company_identification' => $request->get('userCompanyID'),
                ]);
        } else {
            $loanee = new Loanee;
            $loanee->created_at = Carbon::now();
            $loanee->updated_at = Carbon::now();
            $loanee->user_id = $request->get('id');
            $loanee->company_id = $request->get('userCompany');
            $loanee->company_identification = $request->get('userCompanyID');
            $loanee->save();
        }
        return $request;
    }

    public function getUserRecord($id)
    {
        try
        {
            $user = User::whereId($id)->first();
            $loanee = Loanee::where('user_id', $user->id)->first();
            $user->loanee = $loanee;
            return $user;
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }

    public function getEmployees()
    {
        try
        {
            $employeelist = [];
            $employees = User::where('role_id', 4)->get();
            foreach ($employees as $e) {
                $loanee = Loanee::where('user_id', $e->id)->first();
                if ($loanee == null) {
                    continue;
                }
                /*$emp = (object)[];
                $emp->user = $e;
                $emp->loanee = $loanee;
                array_push($employeelist, $emp);*/
                $loans = Loan::where('loanee_id', $loanee->id)->get();
                if (count($loans) == 0) {
                    $emp = (object)[];
                    $emp->user = $e;
                    $emp->loanee = $loanee;
                    array_push($employeelist, $emp);
                } else {
                    foreach($loans as $l) {
                        if ($l->acknowledger_id == null) {
                            continue;
                        }
                        if ($l->approver_id == null) {
                            continue;
                        }
                        $history = LoanHistory::where('loan_id', $l->id)
                            ->where('is_paid', 0)
                            ->get();
                        if (count($history) == 0) {
                            $emp = (object)[];
                            $emp->user = $e;
                            $emp->loanee = $loanee;
                            array_push($employeelist, $emp);
                        }
                    }
                    
                }
                
            }
            return $employeelist;
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }

    public function getEmployeesforEdit()
    {
        try
        {
            $employeelist = [];
            $employees = User::where('role_id', 4)->get();
            foreach ($employees as $e) {
                $loanee = Loanee::where('user_id', $e->id)->first();
                if ($loanee == null) {
                    continue;
                }
                $emp = (object)[];
                $emp->user = $e;
                $emp->loanee = $loanee;
                array_push($employeelist, $emp);
            }
            return $employeelist;
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
