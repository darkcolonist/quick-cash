<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CapitalHistory;

class CapitalHistoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getCapitalHistoryList()
    {
        return view('home');
    }
}
