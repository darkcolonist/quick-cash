<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Loanee;
use App\Models\Company;
use App\Models\CapitalHistory;

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
        return response()->json($capital);
    }
}
