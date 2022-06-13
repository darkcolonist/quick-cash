<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\LoanHistory;
use App\Models\User;
use App\Models\Company;
use App\Models\Loanee;
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
        try
        {
            $data = new Loan;
            $data->loanee_id = $request->get('loanee_id');
            $data->company_id = $request->get('company_id');
            $data->amount = $request->get('amount');
            $data->rate = $request->get('rate');
            $data->term_in_months = $request->get('amortDuration');
            $data->bank_account_loanee = $request->get('bank_account_loanee');
            $data->save();
        }
        catch(Exception $e) {
            Log::error($e);
        }
    }

    public function getPendingLoanRecord($id)
    {
        try
        {
            $loanee = Loanee::where('user_id', $id)->first();
            if ($loanee == null) {
                return null;
            }
            $loan = Loan::where('loanee_id', $loanee->id)
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
            foreach($loans as $loan) {
                $user = User::whereId($loan->loanee->user_id)->first();
                $company = Company::whereId($loan->loanee->company_id)->first();
                $loan->user = $user;
                $loan->company = $company;
            }
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
