<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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

    public function addCompanyForm()
    {
        return view('home');
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

    public function addCompany(Request $request)
    {
        try
        {
            DB::table('companies')->insert([
                'name' => $request->get('companyName')
            ]);
        } catch (Exception $e) {
            Log::error($e);
        }
    }

    public function index()
    {
        return view('home');
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
