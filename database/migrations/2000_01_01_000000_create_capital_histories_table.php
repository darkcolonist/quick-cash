<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCapitalHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('capital_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('company_id')->nullable()->index('company_id');
            $table->unsignedBigInteger('user_id')->nullable()->index('user_id');
            $table->timestamp('date')->nullable();
            $table->decimal('amount', 10)->nullable();
            $table->string('comment')->nullable();
            $table->unsignedBigInteger('loan_history_id')->nullable()->index('loan_history_id');
            $table->decimal('total_amt', 10)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('capital_histories');
    }
}
