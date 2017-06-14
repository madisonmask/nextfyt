<?php

namespace App\Http\Controllers;

use App\EquipmentToExercise;
use App\Exercise;
use App\Http\Controllers\Helpers;
use App\MusclesToExercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
//use Intervention\Image\Image;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\File;
use App\Difficulty;


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
            $imgName = "exercise-" . time() . ".png";
            $webPath = '/pictures/' . $user['id'] . '/' . $imgName;
            $path = public_path() . $webPath;
            //     Image::make($image->getRealPath())->save($path);
            file_put_contents($path, $image);
            $savedImages[$i] = env('APP_URL') . $webPath;
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

      if(!empty($exercise)){

          if($exercise->user_id==$user['id']){
              $exercise->is_new=1;
              $exercise->save();
              return response()->json(['error' => false]);
          }else{
              return response()->json(['error' => true, 'msg'=>'You shall not pass']);
          }

      }else{
          return response()->json(['error' => true, 'msg'=>'exercise not found']);
      }

    }


}
