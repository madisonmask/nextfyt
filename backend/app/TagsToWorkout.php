<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TagsToWorkout extends Model
{
    protected $guarded = ['id'];
    protected $table='tags_to_workout';
}
