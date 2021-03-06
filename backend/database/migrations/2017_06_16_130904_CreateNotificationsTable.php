<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('user_id')->comment('User whosearch this data');
            $table->unsignedBigInteger('user_id_who_make_action')->comment('Id user who make action (like/follow etc.');
            $table->enum('actionType', ['liked', 'followed', 'newworkout']);
            $table->unsignedBigInteger('targetElementId')->comment('id of element  which got action (for example workout, or userprofile');

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
        Schema::dropIfExists('notifications');
    }
}
