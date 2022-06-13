<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    public function loanee()
    {
        return $this->hasOne('App\Models\Loanee', 'id', 'loanee_id');
    }
}
