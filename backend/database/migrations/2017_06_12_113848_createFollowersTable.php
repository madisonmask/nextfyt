<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Followers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('follower_user_id')->comment('User who follow')->index();
            $table->unsignedBigInteger(('following_user_id'))->comment('User  which is followed')->index();
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
        Schema::dropIfExists('Followers');
    }
}
