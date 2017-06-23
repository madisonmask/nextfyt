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

                $filters = [];
                $filterStr='';
                if (isset($request->Filters) AND ($request->Filters['enabled'] == true)) {

                    if (isset($request->Filters['Cardio'])) {
                        if ($request->Filters['Cardio'] == true) {
                            $filters[] = 'workouts.cardio=1';
                        } else {
                            $filters[] = 'workouts.cardio=0';
                        }
                    }

                    if (isset($request->Filters['Difficulty']) AND (count($request->Filters['Difficulty']) > 0)) {
                        $difficulties = '';
                        foreach ($request->Filters['Difficulty'] AS $dif) {
                            $difficulties .= $dif['id'] . ',';
                        }
                        $difficulties = substr($difficulties, 0, -1);
                        $filters[] = 'workouts.difficulty IN  (' . $difficulties . ')';
                    }

                    if (isset($request->Filters['Equipment']) AND (count($request->Filters['Equipment']) > 0)) {
                        $equipments = '';
                        foreach ($request->Filters['Equipment'] AS $item) {
                            $equipments .= $item['id'] . ',';
                        }
                        $equipments = substr($equipments, 0, -1);
                        $filters[] = 'equipment_to_exercise.equipment_id IN  (' . $equipments . ')';
                    }

                    if (isset($request->Filters['Muscles']) AND (count($request->Filters['Muscles']) > 0)) {
                        $muscles = '';
                        foreach ($request->Filters['Muscles'] AS $item) {
                            $muscles .= $item['id'] . ',';
                        }
                        $muscles = substr($muscles, 0, -1);
                        $filters[] = 'muscles_to_exercise.muscles_id IN  (' . $muscles . ')';
                    }


                    if (isset($request->Filters['TimeLength'])) {
                        if ($request->Filters['TimeLength'] == 0 ) {
                        } else {
                            $filters[] = 'workouts.Time ='.$request->Filters['TimeLength'];
                        }
                    }

                    foreach($filters as $filter){

                        $filterStr.='AND '.$filter;

                    }

                }



                //     $workoutsByName = Workout::where('name', 'LIKE', '%' . $request->SearchString . '%')->get();
                $sql = "SELECT workouts.*, workoutlikes.id AS liked
                        FROM workouts
                        LEFT JOIN workoutlikes ON
                         workoutlikes.workout_id=workouts.id AND workoutlikes.user_id=" . $user['id'] . "
                         
                           inner join exercise_to_workout
                         ON
                         exercise_to_workout.workout_id =workouts.id
                         left join equipment_to_exercise
                         on
                    equipment_to_exercise.exercise_id    = exercise_to_workout.exercise_id 
                    
                         left join muscles_to_exercise
                         on 
                         muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    
                         
                         
                        WHERE workouts.name LIKE '%" . $request->SearchString . "%'
                        
                       ".$filterStr."
                       
                       GROUP BY workouts.id
                       ";

         //       echo $sql;
                $workoutsByName = DB::select($sql);

                $exportWorkout = [];
                $i = 0;
                foreach ($workoutsByName as $work) {
                    $exportWorkout[$i]['author'] = $user['username'];
                    $exportWorkout[$i]['name'] = $work->name;
                    $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
                    $exportWorkout[$i]['liked'] = $work->liked;
                    $exportWorkout[$i]['workoutId'] = $work->id;

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

                $usersByName = User::where('name', 'LIKE', '%' . $request->SearchString . '%')->get(['avatar', 'followers', 'following', 'id', 'name', 'posts']);

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
                        WHERE tags.name LIKE '%" . $request->SearchString . "%'
                        )
                        GROUP BY tags_to_workout.tags_id";


                $results = DB::select($sql);


                break;


        }


        return response()->json(['error' => false, 'results' => $results]);


    }
}
