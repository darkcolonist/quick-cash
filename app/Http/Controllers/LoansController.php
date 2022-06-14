<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\LoanHistory;
use App\Models\User;
use App\Models\Company;
use App\Models\Loanee;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

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
            $data->is_companyPayingLoan = 0;
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
            if ($loan != null) {
                return response()->json($loan);
            }
            $loan = Loan::where('loanee_id', $loanee->id)
                ->first();
            if ($loan == null) {
                return null;
            }
            $loanhistories = LoanHistory::where('loan_id', $loan->id)
                ->where('is_paid', 0)
                ->first();
            if ($loanhistories) {
                return response()->json($loan);
            }
            
        }
        catch (Exception $e)
        {
            Log::error($e);
        }
    }

    public function getLoanEmployees($id)
    {
        try
        {
            $loans = '';
            $requestor = User::whereId($id)->first();
            if ($requestor->role_id == 3) {
                $company = Loanee::where('user_id', $id)->first();
                $loans = Loan::where('is_companyPayingLoan', 0)
                ->where('company_id', $company->company_id)
                ->with('loanee')
                ->orderBy('id', 'ASC')
                ->get();
            } else {
                $loans = Loan::where('is_companyPayingLoan', 0)
                ->with('loanee')
                ->orderBy('id', 'ASC')
                ->get();
            }
            
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

    public function approveLoan($id)
    {
        $user = User::whereId(Auth::id())->first();
        $loan = Loan::whereId($id)
            ->update([
                'approver_id'=>$user->id,
                'date_approved'=>now()
            ]);
        return redirect('/loan/employees');
    }

    public function acknowledgeLoan($id)
    {
        // approves loan
        $user = User::whereId(Auth::id())->first();
        $loan = Loan::whereId($id)
            ->update([
                'acknowledger_id'=>$user->id,
                'date_acknowledged'=>now()
            ]);

        // creates loan history
        $loan = Loan::whereId($id)->first();
        //$debt = $loan->amount + $loan->amount * ($loan->rate/100);
        //$debtpermonth = $debt / $loan->term_in_months;
        $refMonth = Carbon::now()->startOfMonth();

        $loanHistory = LoanHistory::where('loan_id', $loan->id)->first();
        if (!$loanHistory){
            for ($x=0; $x<$loan->term_in_months; $x++) {
                $amortDate = $refMonth->addMonth();
                $data = new LoanHistory;
                $data->loan_id = $loan->id;
                $data->amortization_date = $amortDate;
                $data->save();
            }
        }
        
        return redirect('/loan/employees');
    }

    public function showLoanEmployees()
    {
        return view('home');
    }

    public function showLoanDetails($id)
    {
        return view('home');
    }

    public function getLoanDetails($id)
    {
        $loan = Loan::whereId($id)->first();
        $history = LoanHistory::where('loan_id', $id)->get();
        $approver = User::whereId($loan->approver_id)->first();
        $acknowledger = User::whereId($loan->acknowledger_id)->first();
        $loan->history = $history;
        $loan->historylength = count($loan->history);
        $loan->approver = $approver;
        $loan->acknowledger = $acknowledger;
        return $loan;
    }
}
