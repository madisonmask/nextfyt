<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExerciseToWorkout extends Model
{
    protected $guarded = ['id'];
    protected $table='exercise_to_workout';

/*
    public function Exercises (){
        return $this->hasMany('App\Exercise', 'id', 'exercise_id');
    }

*/
}
