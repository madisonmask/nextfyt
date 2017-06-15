<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WorkoutLike extends Model
{
    protected $guarded = ['id'];
    protected $table='workoutlikes';
}
