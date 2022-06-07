<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->foreign(['loanee_id'], 'loans_ibfk_1')->references(['id'])->on('loanees')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign(['company_id'], 'loans_ibfk_2')->references(['id'])->on('companies')->onUpdate('NO ACTION')->onDelete('NO ACTION');
            $table->foreign(['approver_id'], 'loans_ibfk_3')->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign(['acknowledger_id'], 'loans_ibfk_4')->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('loans', function (Blueprint $table) {
            $table->dropForeign('loans_ibfk_1');
            $table->dropForeign('loans_ibfk_2');
            $table->dropForeign('loans_ibfk_3');
            $table->dropForeign('loans_ibfk_4');
        });
    }
}
