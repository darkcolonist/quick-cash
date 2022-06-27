<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class CapitalHistory extends Model
{
    public $timestamps = false;
    
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public static function getCurrentCapital()
    {
        $capital = self::orderBy('id', 'desc')->first();
        $capital = (!$capital) ? 0 : $capital->total_amt;
        return $capital;
    }

    public static function getCapitalHistoryList()
    {
        $historylist = self::orderBy('id', 'ASC')->get();
        for ($i=0; $i<count($historylist); $i++) {
            $date = Carbon::parse($historylist[$i]->date);
            $historylist[$i]->formatted_date = $date->toDayDateTimeString();
        }
        return $historylist;
    }
}
