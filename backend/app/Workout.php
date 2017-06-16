<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    protected $guarded = ['id'];


    public function user(){
        return $this->hasOne('App\User','id', 'user_id');
    }

    public function Exercises()
    {
        return $this->hasManyThrough('App\Exercise', 'App\ExerciseToWorkout', 'workout_id', 'id', 'id');
    }


    public function keepers(){
        return $this->hasOne('App\WorkoutKepers','workout_id', 'id');
    }

}
