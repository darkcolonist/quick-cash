<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToLoanHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('loan_histories', function (Blueprint $table) {
            $table->foreign(['loan_id'], 'loan_histories_ibfk_1')->references(['id'])->on('loans')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('loan_histories', function (Blueprint $table) {
            $table->dropForeign('loan_histories_ibfk_1');
        });
    }
}
