<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Loanee;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = User::whereId(Auth::id())->first();
        $loanee = Loanee::where('user_id', $user->id)->first();
        if ($user->role_id == 4 && empty($loanee)) {
            return redirect('/new/user/login');
        } else {
            return view('home');
        }
        
    }
}
