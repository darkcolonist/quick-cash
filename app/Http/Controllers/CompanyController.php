<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    public function getCompanyList()
    {
        try
        {
            $companies = Company::orderBy('id', 'ASC')->get();
            return response()->json($companies);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

    public function index(Request $request)
    {

    }

    public function store(Request $request)
    {

    }

    public function update(Request $request, Company $company)
    {

    }

    public function destroy(Company $company)
    {
        
    }
}
