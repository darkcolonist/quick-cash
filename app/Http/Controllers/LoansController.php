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
}
