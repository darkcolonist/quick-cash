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

    public function getCompanyRecord(Request $request)
    {
        try
        {
            $companyRecord = Company::findOrFail($request->get('companyId'));
            return response()->json($companyRecord);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

    public function updateCompany(Request $request)
    {
        try{
            $company_id = $request->get('companyId');
            $company_name = $request->get('companyName');
            Company::where('id', $company_id)->update([
                'name' => $company_name
            ]);

            return response()->json([
                'name' => $company_name
            ]);
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
