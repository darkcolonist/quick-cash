<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToLoaneesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('loanees', function (Blueprint $table) {
            $table->foreign(['user_id'], 'loanees_ibfk_1')->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign(['company_id'], 'loanees_ibfk_2')->references(['id'])->on('companies')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('loanees', function (Blueprint $table) {
            $table->dropForeign('loanees_ibfk_1');
            $table->dropForeign('loanees_ibfk_2');
        });
    }
}
