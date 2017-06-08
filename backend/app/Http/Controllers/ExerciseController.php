<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExerciseController extends Controller
{
    //
    public function saveExercise (Request $request){

         Log::info(print_r($request->all(), true));

    }
}
