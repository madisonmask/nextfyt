<?php

namespace App\Http\Controllers;

use App\EquipmentToExercise;
use App\Exercise;
use App\Http\Controllers\Helpers;
use App\MusclesToExercise;
use App\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
//use Intervention\Image\Image;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;
use App\Difficulty;
use Illuminate\Support\Facades\DB;


class ExerciseController extends Controller
{
    //
    public function saveExercise(Request $request)
    {

        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->name] = $dif->id;
        }

        $user = Helpers::getUser($request);

        $savedImages = [0 => '', 1 => '', 2 => '', 3 => '', 4 => '', 5 => ''];
        $i = 0;

        $path = public_path() . '/pictures';
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }

        $path = public_path() . '/pictures/' . $user['id'];
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }


        foreach ($request->Images as $imagStr) {
            $image = base64_decode($imagStr);
            $imgName = "exercise-" . time() . "_".rand(1000,9000).".png";
            $webPath = '/pictures/' . $user['id'] . '/' . $imgName;
            $path = public_path() . $webPath;
            //     Image::make($image->getRealPath())->save($path);
            file_put_contents($path, $image);
            $savedImages[$i] =  $webPath;
            $i++;

        }

        if (!isset($request->repeat_count) OR empty($request->length_count)) {
            $repeat_count = 0;
        } else {
            $repeat_count = $request->repeat_count;
        }

        if (!isset($request->length_count) OR empty($request->length_count)) {
            $length_count = 0;
        } else {
            $length_count = $request->length_count;
        }


        if (!isset($request->id)) {
            $createdExercise = Exercise::create(['name' => $request->Name, 'user_id' => $user['id'], 'stage1_img' => $savedImages[0],
                'stage2_img' => $savedImages[1], 'stage3_img' => $savedImages[2],
                'stage4_img' => $savedImages[3], 'stage5_img' => $savedImages[4],
                'stage6_img' => $savedImages[5], 'repeat_count' => $repeat_count,
                'repeat_type' => $request->repeat_type,           // ['steps', 'movements']);
                'length_count' => $length_count,
                'length_type' => $request->length_type, //['Seconds', 'Minutes', 'Reps']);
                'cardio' => $request->Filters['Cardio'],
                'Difficulty' => $difficultys[$request->Filters['Difficulty']],
                'is_new' => 1
            ]);

            foreach ($request->Filters['Muscles'] as $m) {
                $muscles = MusclesToExercise::create(['muscles_id' => $m['id'], 'exercise_id' => $createdExercise->id]);
            }


            foreach ($request->Filters['Equipment'] as $e) {
                $muscles = EquipmentToExercise::create(['equipment_id' => $e['id'], 'exercise_id' => $createdExercise->id]);
            }


        } else {

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


        }


        return response()->json(['error' => false]);

    }

    /**
     * Get all my exercises
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExercises(Request $request)
    {
        $user = Helpers::getUser($request);

        $exercises = Exercise::where('user_id', $user['id'])->get();

        $exportExercise = [];
        $i = 0;
        foreach ($exercises as $ex) {
            $exportExercise[$i] = $ex;
            $exportExercise[$i]['equipment'] = $ex->equipments()->get(['equipment.name']);;
            $exportExercise[$i]['muscles'] = $ex->muscles()->get(['muscles.name']);;

            $i++;
        }
        return response()->json(['error' => false, 'exercises' => $exportExercise]);
    }

    public function getExercisesDefault(Request $request)
    {
        $user = Helpers::getUser($request);

        $exercises = Exercise::where('is_default', 1)->get();

        $exportExercise = [];
        $i = 0;
        foreach ($exercises as $ex) {
            $exportExercise[$i] = $ex;
            $exportExercise[$i]['equipment'] = $ex->equipments()->get(['equipment.name']);;
            $exportExercise[$i]['muscles'] = $ex->muscles()->get(['muscles.name']);;

            $i++;
        }
        return response()->json(['error' => false, 'exercises' => $exportExercise]);
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExercise(Request $request, $exerciseId)
    {
        $user = Helpers::getUser($request);
        $exercise = Exercise::find($exerciseId);
        $exportExercise = [];
        $exportExercise = $exercise;
        $exportExercise['equipment'] = $exercise->equipments()->get(['equipment.name']);;
        $exportExercise['muscles'] = $exercise->muscles()->get(['muscles.name']);;
        return response()->json(['error' => false, 'exercises' => $exportExercise]);
    }


    /**
     * Get new exercises, whic we will use for current workout
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExercisesNew(Request $request)
    {
        $user = Helpers::getUser($request);
        /*
                if (empty($user)) {
                    $user = ['id' => 0, 'username' => 'TESTuser', 'avatar' => '/assets/images/avatar.jpg', 'email' => 'fake@email.com', 'posts' => 0, 'followers' => 0, 'following' => 0];
                    $user = (object)$user;
                }*/
        $exercises = Exercise::where('user_id', $user['id'])->where('is_new', 1)->get();

        $exportExercise = [];
        $i = 0;
        foreach ($exercises as $ex) {
            $exportExercise[$i] = $ex;
            $exportExercise[$i]['equipment'] = $ex->equipments()->get(['equipment.name']);;
            $exportExercise[$i]['muscles'] = $ex->muscles()->get(['muscles.name']);;

            $i++;
        }
        return response()->json(['error' => false, 'exercises' => $exportExercise]);
    }


    public function setExercisesNew(Request $request)
    {
        $user = Helpers::getUser($request);

        $exercise = Exercise::find($request->exercise);

        if (!empty($exercise)) {

            if ($exercise->user_id == $user['id']) {
                $exercise->is_new = 1;
                $exercise->save();
                return response()->json(['error' => false]);
            } else {
                return response()->json(['error' => true, 'msg' => 'You shall not pass']);
            }

        } else {
            return response()->json(['error' => true, 'msg' => 'exercise not found']);
        }

    }

    public function setExercisesOld(Request $request)
    {
        $user = Helpers::getUser($request);

        $exercise = Exercise::find($request->exercise);

        if (!empty($exercise)) {

            if ($exercise->user_id == $user['id']) {
                $exercise->is_new = 0;
                $exercise->save();
                return response()->json(['error' => false]);
            } else {
                return response()->json(['error' => true, 'msg' => 'You shall not pass']);
            }

        } else {
            return response()->json(['error' => true, 'msg' => 'exercise not found']);
        }

    }

    /**
     * Delete exercise from DB
     * @todo DELETE IMAGES AND LINKED TABLE TOO!!!!
     * @param Request $request
     * @param $exerciseId
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteExercise(Request $request, $exerciseId)
    {
        $user = Helpers::getUser($request);

        $exercise = Exercise::find($exerciseId);

        if (!empty($exercise)) {
            if ($exercise->user_id == $user['id']) {
                $exercise->delete();
                return response()->json(['error' => false]);
            } else {
                return response()->json(['error' => true, 'msg' => 'You shall not pass']);
            }
        } else {
            return response()->json(['error' => true, 'msg' => 'exercise not found']);
        }
    }


    public function getExercisesForWorkout(Request $request, $workoutId)
    {

        $user = Helpers::getUser($request);

  //      $workout = Workout::find($workoutId);

        $sql='SELECT `exercises`.id
                FROM `exercises`
                INNER JOIN `exercise_to_workout` ON `exercise_to_workout`.`exercise_id` = `exercises`.`id`
                WHERE `exercise_to_workout`.`workout_id` = ?';
        $exerciseIds=DB::select($sql,[$workoutId]);
        //   $exercises = Exercise::where('user_id', $user['id'])->where('id', 1)->get();

        $exportExercise = [];
        $i = 0;
        foreach($exerciseIds as $ex){



        $exercise = Exercise::find($ex->id);



    //    foreach ($exercises as $ex) {
            $exportExercise[$i] = $exercise;
            $exportExercise[$i]['equipment'] = $exercise->equipments()->get(['equipment.name']);;
            $exportExercise[$i]['muscles'] = $exercise->muscles()->get(['muscles.name']);;

            $i++;
   //     }

    }

        return response()->json(['error' => false, 'exercises' => $exportExercise]);

    }


    public function selectDefault(Request $request)
    {

        $user = Helpers::getUser($request);


        $exerciseDefault = Exercise::find($request->exercise);


        $createdExercise = Exercise::create(['name' => $exerciseDefault->name, 'user_id' => $user['id'], 'stage1_img' => $exerciseDefault->stage1_img,
            'stage2_img' => $exerciseDefault->stage2_img, 'stage3_img' => $exerciseDefault->stage3_img,
            'stage4_img' => $exerciseDefault->stage4_img, 'stage5_img' => $exerciseDefault->stage5_img,
            'stage6_img' => $exerciseDefault->stage6_img, 'repeat_count' => $request->repeat_count,
            'repeat_type' => $request->repeat_type,           // ['steps', 'movements']);
            'length_count' => $request->length_count,
            'length_type' => $request->length_type, //['Seconds', 'Minutes', 'Reps']);
            'cardio' => $exerciseDefault->cardio,
            'Difficulty' => $exerciseDefault->Difficulty,
            'is_new' => 1
        ]);


        $muscles = MusclesToExercise::where('exercise_id', $exerciseDefault->id)->get();
        foreach ($muscles as $m) {

            $muscles = MusclesToExercise::create(['muscles_id' => $m->muscles_id, 'exercise_id' => $createdExercise->id]);
        }

        $eequipmnet = EquipmentToExercise::where('exercise_id', $exerciseDefault->id)->get();
        foreach ($eequipmnet as $e) {

            $muscles = EquipmentToExercise::create(['equipment_id' => $e->equipment_id, 'exercise_id' => $createdExercise->id]);
        }

        return response()->json(['error' => false]);
    }
}
