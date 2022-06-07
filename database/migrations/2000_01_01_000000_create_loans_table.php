<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->unsignedBigInteger('loanee_id')->index('loanee_id');
            $table->unsignedBigInteger('company_id')->index('loans_ibfk_2');
            $table->decimal('amount', 10)->nullable();
            $table->double('rate')->nullable();
            $table->bigInteger('term_in_months')->nullable();
            $table->unsignedBigInteger('approver_id')->nullable()->index('approver_id');
            $table->unsignedBigInteger('acknowledger_id')->nullable()->index('acknowledger_id');
            $table->timestamp('date_approved')->nullable();
            $table->timestamp('date_acknowledged')->nullable();
            $table->string('bank_account_loanee')->nullable();
            $table->string('bank_account_lender')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('loans');
    }
}
