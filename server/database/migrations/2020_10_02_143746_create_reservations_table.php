<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index()->nullable();
            $table->integer('room_id')->unsigned()->index()->nullable();
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->text('notes');
            $table->timestamps();
            /**
             * Table relations
             */
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('restrict')->onDelete('set null');
            $table->foreign('room_id')->references('id')->on('rooms')->onUpdate('restrict')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
