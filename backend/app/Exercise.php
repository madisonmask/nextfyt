<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{

    protected $guarded = ['id'];



    public function equipments()
    {
        return $this->hasManyThrough('App\Equipment', 'App\EquipmentToExercise', 'exercise_id', 'id', 'id');
    }


    public function muscles()
    {
        return $this->hasManyThrough('App\Muscle', 'App\EquipmentToExercise', 'exercise_id', 'id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\User',  'user_id', 'id');
    }



}
