<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuration;
use Illuminate\Support\Facades\Auth;

class ConfigurationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getConfigurationList()
    {
        try
        {
            $configs = Configuration::orderBy('id', 'ASC')->get();
            return response()->json($configs);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

    public function updateConfiguration(Request $request)
    {
        try{
            foreach($request->get('config') as $config){
                $configvalue = $config['value'];
                Configuration::where('id', $config['id'])->update([
                    'value' => $configvalue
                ]);
            }
            return response()->json([
                'value' => $configvalue
            ]);
        }
        catch(Exception $e)
        {
            Log::error($e);
        }
    }

    public function editConfigForm(Request $request)
    {
        return view('home');
    }
}
