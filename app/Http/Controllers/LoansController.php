<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\LoanHistory;
use Illuminate\Support\Facades\Auth;

class LoansController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function requestLoan()
    {
        return view('home');
    }

    public function addLoan(Request $request)
    {
        return $request;
        try
        {
            $data = new Loan;
            $data->loanee_id = $request->get('dummy');
            $data->company_id = $request->get('dummy');
            $data->amount = $request->get('dummy');
            $data->rate = $request->get('dummy');
            $data->term_in_months = $request->get('dummy');
            $data->bank_account_loanee = $request->get('dummy');
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

    public function getPendingLoanRecord($id)
    {
        try
        {
            $loan = Loan::where('loanee_id', $id)
                ->where('approver_id', null)
                ->where('acknowledger_id', null)
                ->first();
            return $loan;
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }

    public function getLoanEmployees()
    {
        try
        {
            $loans = Loan::where('is_companyPayingLoan', 0)
                ->with('loanee')
                ->orderBy('id', 'ASC')
                ->get();
            return response()->json($loans);
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }

    public function showLoanEmployees()
    {
        return view('home');
    }
}
