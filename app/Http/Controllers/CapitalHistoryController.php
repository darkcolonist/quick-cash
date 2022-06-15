<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Loanee;
use App\Models\Company;
use App\Models\CapitalHistory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CapitalHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function showCapitalHistoryList()
    {
        return view('home');
    }

    public function getCapitalHistoryList()
    {
        $capital = CapitalHistory::orderBy('id', 'ASC')->get();
        for ($x=0; $x<count($capital); $x++){
            $date = Carbon::parse($capital[$x]->date);
            $capital[$x]->formatted_date = $date->toDayDateTimeString();
        }
        return response()->json($capital);
    }

    public function getCurrentCapital()
    {
        $capital = CapitalHistory::orderBy('id', 'desc')->first();
        return $capital->total_amt;
    }

    public function showAddCapitalForm()
    {
        return view('home');
    }

    public function loanSubtractFromCapital(Request $request)
    {

    }

    public function loanRepayAddToCapital(Request $request)
    {
        
    }

    public function addCapital(Request $request)
    {
        $user = User::whereId(Auth::id())->first();
        $capital = CapitalHistory::orderBy('id', 'desc')->first();
        $newCapital = new CapitalHistory;
        $newCapital->amount = $request->get('capitalAmt');
        $newCapital->comment = $request->get('capitalComment');
        $newCapital->user_id = $user->id;
        $newCapital->date = Carbon::now();
        if (!$capital) {
            $newCapital->total_amt = $request->get('capitalAmt');
        } else {
            $newCapital->total_amt = $capital->total_amt + $request->get('capitalAmt');
        }
        $newCapital->save();
        return $newCapital->id;
    }
}
