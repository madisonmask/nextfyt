<?php

namespace App\Http\Controllers;

use App\Workout;
use Illuminate\Http\Request;
use App\User;
use App\Difficulty;
use Illuminate\Support\Facades\DB;


class SearchController extends Controller
{
    public function makeSearch(Request $request)
    {
        $user = Helpers::getUser($request);
        $userProfile = User::find($user['id']);

        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }


        $results = [];
        switch ($request->Type) {

            case 'workouts':

           //     $workoutsByName = Workout::where('name', 'LIKE', '%' . $request->SearchString . '%')->get();
                $sql = "SELECT workouts.*, workoutlikes.id AS liked
                        FROM workouts
                        LEFT JOIN workoutlikes ON
                         workoutlikes.workout_id=workouts.id AND workoutlikes.user_id=".$user['id']."
                        WHERE workouts.name LIKE '%".$request->SearchString ."%'";
                $workoutsByName =DB::select($sql);

                $exportWorkout = [];
                $i = 0;
                foreach ($workoutsByName as $work) {
                    $exportWorkout[$i]['author'] = $user['username'];
                    $exportWorkout[$i]['name'] = $work->name;
                    $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
                    $exportWorkout[$i]['liked'] = $work->liked;
                    $exportWorkout[$i]['id'] = $work->id;

                    $sql = '  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id=' . $work->id . ' AND muscles.name IS NOT NULL';
                    $muscles = DB::select($sql);

                    ////
                    $exportWorkout[$i]['muscles'] = $muscles;
///


                    $exportWorkout[$i]['cardio'] = $work->cardio;
                    $exportWorkout[$i]['image'] = $work->photo;


                    /*
                                $exportWorkout[$i]['equipment'] =     $work->equipments()->get(['equipment.name']);;
                                $exportWorkout[$i]['muscles'] =     $work->muscles()->get(['muscles.name']);;
                    */
                    $i++;
                }


                $results = $exportWorkout;


                break;


            case 'top':


                break;


            case 'people':

                $usersByName = User::where('name', 'LIKE', '%' . $request->SearchString . '%')->get(['avatar', 'followers' ,'following', 'id', 'name', 'posts']);

                $results = $usersByName;


                break;


            case 'tags':
                $sql = "SELECT COUNT(*) AS TotalUsed, tags.name
                        FROM tags_to_workout
                        LEFT JOIN tags ON tags_to_workout.tags_id = tags.id
                        WHERE tags_to_workout.tags_id IN 
                        (
                        SELECT tags.id
                        FROM tags
                        WHERE tags.name LIKE '%".$request->SearchString."%'
                        )
                        GROUP BY tags_to_workout.tags_id";



                $results =DB::select($sql);


                break;


        }


        return response()->json(['error' => false, 'results' => $results]);


    }
}
