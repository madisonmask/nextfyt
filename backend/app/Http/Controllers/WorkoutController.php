<?php

namespace App\Http\Controllers;

use App\Difficulty;
use App\ExerciseToWorkout;
use App\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class WorkoutController extends Controller
{
    public function saveWorkout(Request $request)
    {

        $difficulty = Difficulty::all();
        $difficultyRate = []; //all avaliable diffuculties and their rate
        $difficulties = []; //rate to name
        foreach ($difficulty as $dif) {
            $difficultyRate[$dif->name] = $dif->difficulty_level;
            $difficulties[$dif->difficulty_level] = $dif->id;
        }
        $user = Auth::user();

        if (empty($user)) {
            $user = ['id' => 0, 'username' => 'TESTuser', 'avatar' => '/assets/images/avatar.jpg', 'email' => 'fake@email.com', 'posts' => 0, 'followers' => 0, 'following' => 0];
            $user = (object)$user;
        }


        $path = public_path() . '/pictures';
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }

        $path = public_path() . '/pictures/' . $user->id;
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }


        $imagStr = $request->ImageData;
        if (!empty($imagStr)) {


            $image = base64_decode($imagStr);
            $imgName = "workout-" . time() . ".png";
            $webPath = '/pictures/' . $user->id . '/' . $imgName;
            $path = public_path() . $webPath;
            //     Image::make($image->getRealPath())->save($path);
            file_put_contents($path, $image);
            $photo = env('APP_URL') . $webPath;
        } else {
            $photo = '';
        }

        if (!isset($request->Length) OR empty($request->Length)) {
            $Length = 0;
        } else {
            $Length = $request->Length;
        }


        if (!isset($request->id)) {

            //findMaxDifficulty than greater value then harder
            $isCardio = 0;
            $maxDiffRate = 0;
            foreach ($request->Exercises as $ex) {
                print_r($ex);
                if ($ex['cardio'] == 1) {
                    $isCardio = 1;
                }


                if ($ex['Difficulty'] > $maxDiffRate) {
                    $maxDiffRate = $ex['Difficulty'];
                }

            }
            if (isset($difficulties[$maxDiffRate])) {
                $WorkoutDifficulty = $difficulties[$maxDiffRate];
            } else {
                $WorkoutDifficulty = 'beginer';
            }


            $createdWorkout = Workout::create(['name' => $request->Name, 'user_id' => $user->id,
                'photo' => $photo,
                'countLikes' => 0,
                'difficulty' => $WorkoutDifficulty,
                'cardio' => $isCardio,
            ]);

            foreach ($request->Exercises as $ex) {
                $exercisetoworkout = ExerciseToWorkout::create(['workout_id' => $createdWorkout->id, 'exercise_id' => $ex['id']]);
            }


        } else {
            /*
                        $createdExercise = Exercise::find($request->id);

                        $createdExercise->name = $request->Name;
                        $createdExercise->stage1_img = $savedImages[0];
                        $createdExercise->stage2_img = $savedImages[1];
                        $createdExercise->stage3_img = $savedImages[2];
                        $createdExercise->stage4_img = $savedImages[3];
                        $createdExercise->stage5_img = $savedImages[4];
                        $createdExercise->stage6_img = $savedImages[5];
                        $createdExercise->repeat_count = $repeat_count;
                        $createdExercise->repeat_type = $request->repeat_type;
                        $createdExercise->length_count = $length_count;
                        $createdExercise->length_type = $request->length_type;

                        $createdExercise->save();

            */
        }


        return response()->json(['error' => false]);

    }


    public function getMyWorkouts()
    {

        $user = Auth::user();

        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }
        if (empty($user)) {
            $user = ['id' => 0, 'username' => 'TESTuser', 'avatar' => '/assets/images/avatar.jpg', 'email' => 'fake@email.com', 'posts' => 0, 'followers' => 0, 'following' => 0];
            $user = (object)$user;
        }
        $workouts = Workout::where('user_id', $user->id)->get();


        /*


                    skill: 'adv',
                    muscles: 'all',
                    cardio: false,
                    image: 'http://via.placeholder.com/350x150'

                */

        $exportWorkout = [];
        $i = 0;
        foreach ($workouts as $work) {
            $exportWorkout[$i]['author'] = $user->username;
            $exportWorkout[$i]['name'] = $work->name;
            $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];

            $sql='  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id='.$work->id.' AND muscles.name IS NOT NULL';
           $muscles=DB::select($sql);

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

        return response()->json(['error' => false, 'workouts' => $exportWorkout]);

    }
}
