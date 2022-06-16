<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Loan;
use App\Models\LoanHistory;
use App\Models\User;
use App\Models\Company;
use App\Models\Loanee;
use App\Models\CapitalHistory;
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
        //from request
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

    public function createLoan(Request $request)
    {
        try
        {
            $loan = new Loan;
            $loanee = Loanee::where('user_id', $request->get('loanLoanee'))->first();
            $loan->loanee_id = $loanee->id;
            $loan->company_id = $loanee->company_id;
            $loan->amount = $request->get('loanAmt');
            $loan->rate = $request->get('loanRate');
            $loan->term_in_months = $request->get('loanTerm');
            $loan->bank_account_loanee = $request->get('loanLoaneeBank');
            $loan->bank_account_lender = $request->get('loanLenderBank');
            $loan->is_companyPayingLoan = 0;
            $loan->save();
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
                ->first();
            if ($loan != null) {
                return response()->json($loan);
            }
            $loan = Loan::where('loanee_id', $loanee->id)
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
                ->where('is_paid', null)
                ->get();
            if (count($loanhistories) > 0) {
                $loanhistories = LoanHistory::where('loan_id', $loan->id)->get();
                $loan->historycount = count($loanhistories);
                $loan->history = $loanhistories;
                
                $loan->debt = $loan->amount + $loan->amount * ($loan->rate/100);
                $loan->debtpermonth = $loan->debt / $loan->term_in_months;
                $amort_dates = [];
                if (count($loanhistories) > 0) {
                    for ($x=0; $x<$loan->term_in_months; $x++) {
                        $date = Carbon::parse($loan->history[$x]->amortization_date);
                        array_push($amort_dates, $date->toFormattedDateString());
                    }
                    $loan->amort_dates = $amort_dates;
                }
                
                
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

    public function addLoanForm()
    {
        return view('home');
    }

    public function loanEditForm()
    {
        return view('home');
    }

    public function loanUpdate(Request $request)
    {
        $loanee = Loanee::where('user_id', $request->get('loanLoanee'))->first();
        $loan = Loan::whereId($request->get('loanID'))
            ->update([
                'loanee_id' => $loanee->id,
                'company_id' => $loanee->company_id,
                'amount' => $request->get('loanAmt'),
                'rate' => $request->get('loanRate'),
                'term_in_months' => $request->get('loanTerm'),
                'bank_account_loanee' => $request->get('loanLoaneeBank'),
                'bank_account_lender' => $request->get('loanLenderBank'),
            ]);
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

        //capital
        $lastcapital = CapitalHistory::orderBy('id', 'desc')->first();
        $loanee = Loanee::whereId($loan->loanee_id)->first();
        $loanee_user = User::whereId($loanee->user_id)->first();
        $capital = new CapitalHistory;
        $capital->user_id = $loanee_user->id;
        $capital->date = Carbon::now();
        $capital->amount = $loan->amount;
        $capital->comment = "Loaned";
        $capital->loan_history_id = $loan->id;
        if (!$lastcapital) {
            $capital->total_amt = 0 - $loan->amount;
        } else {
            $capital->total_amt = $lastcapital->total_amt - $loan->amount;
        }
        
        $capital->save();
        
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
        $loanee = Loanee::whereId($loan->loanee_id)->first();
        $loanee_user = User::whereId($loanee->user_id)->first();

        $loan->debt = $loan->amount + $loan->amount * ($loan->rate/100);
        $dpm = ($loan->debt / $loan->term_in_months);
        $loan->debtpermonth = number_format($dpm, 2);

        $dateofapplication = Carbon::parse($loan->created_at);
        $dateofapplication = $dateofapplication->toFormattedDateString();
        $amort_dates = [];
        if (count($history) > 0) {
            for ($x=0; $x<$loan->term_in_months; $x++) {
                $date = Carbon::parse($history[$x]->amortization_date);
                array_push($amort_dates, $date->toFormattedDateString());
            }
            $loan->amort_dates = $amort_dates;
        }

        $loan->dateofapplication = $dateofapplication;
        $loan->history = $history;
        $loan->historylength = count($loan->history);
        $loan->approver = $approver;
        $loan->acknowledger = $acknowledger;
        $loan->user = $loanee_user;
        return $loan;
    }

    public function showLoanPayForm($id) 
    {
        return view('home');
    }

    public function getHistorysLoan($id)
    {
        $hist = LoanHistory::whereId($id)->first();
        return $hist->loan_id;
    }

    public function payLoan(Request $request)
    {
        $id = $request->get('id');
        $bank_account_lender = $request->get('bank_account_lender');
        $bank_account_loanee = $request->get('bank_account_loanee');
        $loanhistory = LoanHistory::whereId($id)
            ->update([
                'is_paid' => 1,
                'bank_account_lender' => $bank_account_lender,
                'bank_account_loanee' => $bank_account_loanee
            ]);
        
        $lh = LoanHistory::whereId($id)->first();
        $loan = Loan::whereId($lh->loan_id)->first();
        $loanee = Loanee::whereId($loan->loanee_id)->first();
        $user = User::whereId($loanee->user_id)->first();
        $partial_payment = ($loan->amount + ($loan->amount * ($loan->rate/100))) / $loan->term_in_months;
        

        // capital
        $lastcapital = CapitalHistory::orderBy('id', 'desc')->first();
        $total_amt = 0;
        if (!$lastcapital) {
            $total_amt = $total_amt + $partial_payment;
        } else {
            $total_amt = $lastcapital->total_amt + $partial_payment;
        }
        $capital = new CapitalHistory;
        $capital->user_id = $user->id;
        $capital->date = Carbon::now();
        $capital->amount = $partial_payment;
        $capital->comment = "Partial loan payment";
        $capital->loan_history_id = $loan->id;
        $capital->total_amt = $total_amt;
        $capital->save();
        return;
    }
}
