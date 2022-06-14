<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToCapitalHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('capital_history', function (Blueprint $table) {
            $table->foreign(['company_id'], 'capital_history_ibfk_1')->references(['id'])->on('companies')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign(['user_id'], 'capital_history_ibfk_2')->references(['id'])->on('loan_histories')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign(['loan_history_id'], 'capital_history_ibfk_3')->references(['id'])->on('loan_histories')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign(['user_id'], 'capital_history_ibfk_4')->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('capital_history', function (Blueprint $table) {
            $table->dropForeign('capital_history_ibfk_1');
            $table->dropForeign('capital_history_ibfk_2');
            $table->dropForeign('capital_history_ibfk_3');
            $table->dropForeign('capital_history_ibfk_4');
        });
    }
}
