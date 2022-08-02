<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loanee extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
    ];

    public static function getLoaneeRecord ($id)
    {
        return self::where('user_id', $id)->first();
    }
}
