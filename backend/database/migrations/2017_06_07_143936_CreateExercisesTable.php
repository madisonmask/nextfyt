<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExercisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Exercises', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedBigInteger('user_id');
            $table->string('stage1_img');
            $table->string('stage2_img');
            $table->string('stage3_img');
            $table->string('stage4_img');
            $table->string('stage5_img');
            $table->string('stage6_img');
            $table->integer('repeat_count')->unsigned();
            $table->enum('repeat_type', ['steps', 'movements']);
            $table->integer('length_count')->unsigned();
            $table->enum('length_type', ['Seconds', 'Minutes', 'Reps']);
            $table->boolean('is_new')->default(0);
            $table->boolean('is_default')->default(0);
            $table->boolean('from_default')->default(0);
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
        Schema::dropIfExists('Exercises');
    }
}
