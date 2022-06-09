<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Configuration;

class ConfigurationController extends Controller
{
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
            foreach($request->get('configs') as $config){
                $configvalue = $config['val'];
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
}
