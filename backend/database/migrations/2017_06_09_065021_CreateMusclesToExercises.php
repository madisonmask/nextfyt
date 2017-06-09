<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMusclesToExercises extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('muscles_to_exercise', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('muscles_id')->index();
            $table->unsignedBigInteger('exercise_id')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('muscles_to_exercise');
    }
}
