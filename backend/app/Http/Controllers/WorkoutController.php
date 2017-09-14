<?php

namespace App\Http\Controllers;

use App\Difficulty;
use App\Exercise;
use App\ExerciseToWorkout;
use App\Http\Controllers\Helpers;
use App\TagsToWorkout;
use App\User;
use App\Workout;
use App\WorkoutLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\WorkoutKepers;
use App\Tag;
use App\Activities;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;

/**
 * Class WorkoutController
 * @package App\Http\Controllers
 * [2017-09-07 14:50:47] local.ERROR: exception 'Intervention\Image\Exception\MissingDependencyException' with message 'PHP Fileinfo extension must be installed/enabled to use Intervention Image.' in /home/rams_zp/nextfyt.com/vendor/intervention/image/src/Intervention/Image/ImageManager.php:133
 */
class WorkoutController extends Controller
{
    /**
     * Save workout
     * called from workout-share
     * @route POST api/workout
     * @param Request $requestfo
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveWorkout(Request $request)
    {

        $difficulty = Difficulty::all();
        $difficultyRate = []; //all avaliable diffuculties and their rate
        $difficulties = []; //rate to name
        foreach ($difficulty as $dif) {
            $difficultyRate[$dif->name] = $dif->difficulty_level;
            $difficulties[$dif->difficulty_level] = $dif->id;
        }
        $user = Helpers::getUser($request);
        $userProfile = User::find($user['id']);
        $path = public_path() . '/pictures';
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }
        $path = public_path() . '/pictures/' . $user['id'];
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }

        $imagStr = $request->ImageData;
        Log::info('Image:' . $imagStr);
        if (!empty($imagStr)) {
            $image = base64_decode($imagStr);
            $imgName = "workout-" . time() . ".png";
   //         $imgNameS= "workout-" . time() . "_s.png";
            $webPath = '/pictures/' . $user['id'] . '/' . $imgName;
            $path = public_path() . $webPath;
            //     Image::make($image->getRealPath())->save($path);
            file_put_contents($path, $image);
            $photo = $webPath;
        } else {
            $photo = '';
        }

 //       $imageToWork  =   Image::make($path);
 //       $imageToWork->resize(320, 240);
 //       $imageToWork->save( public_path() . '/pictures/' . $user['id'] . '/' . $imgNameS);


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
                //           print_r($ex);
                if ($ex['cardio'] == 1) {
                    $isCardio = 1;
                }
                if ($ex['Difficulty'] > $maxDiffRate) {
                    $maxDiffRate = $ex['Difficulty'];
                }
            }
            /*    if (isset($difficulties[$maxDiffRate])) {
                    $WorkoutDifficulty = $difficulties[$maxDiffRate];
                } else {
                    $WorkoutDifficulty = 'beginer';
                }*/
            $WorkoutDifficulty = $maxDiffRate;

            $createdWorkout = Workout::create(['name' => $request->Name, 'user_id' => $user['id'],
                'photo' => $photo,
                'countLikes' => 0,
                'difficulty' => $WorkoutDifficulty,
                'cardio' => $isCardio,
                'Time' => $Length
            ]);
            Activities::create(['user_id' => $user['id'], 'actionType' => 'newworkout', 'targetElementId' => $createdWorkout->id]);
            foreach ($request->Exercises as $ex) {
                $exercise = Exercise::find($ex['id']);
                $exercise->is_new = 0;
                $exercise->save();
                $exercisetoworkout = ExerciseToWorkout::create(['workout_id' => $createdWorkout->id, 'exercise_id' => $ex['id']]);
            }

            foreach ($request->Tags as $tag) {
                $tagSaved = Tag::where('name', $tag)->first();
                if (empty($tagSaved)) {
                    $tagSaved = Tag::create(['name' => $tag]);
                }

                $tagsToWorkout = TagsToWorkout::where('workout_id', $createdWorkout->id)->where('tags_id', $tagSaved->id)->first();
                if (empty($tagsToWorkout)) {

                    TagsToWorkout::create(['workout_id' => $createdWorkout->id, 'tags_id' => $tagSaved->id]);
                }


            }


            $userProfile->posts++;
            $userProfile->save();

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


    public function getMyWorkouts(Request $request)
    {

        $user = Helpers::getUser($request);

        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }

        $sql = "SELECT workouts.*, workoutkeepers.id AS Inkeepers,  workoutlikes.id  AS InLiked
                        FROM workouts
                        LEFT JOIN workoutkeepers ON
                        ( workoutkeepers.workout_id=workouts.id AND workoutkeepers.user_id=" . $user['id'] . " )
                            left join workoutlikes
                            on( workoutlikes.user_id=workoutkeepers.user_id AND workoutlikes.workout_id=workouts.id)
                        WHERE workouts.user_id=" . $user['id'] . "
                        ORDER BY workouts.created_at DESC
                        ";
        $workouts = DB::select($sql);


        //     $workouts = Workout::where('user_id', $user['id'])->get();

        $exportWorkout = [];
        $i = 0;
        if (isset($workouts[0])) {
            foreach ($workouts as $work) {
                $exportWorkout[$i]['author'] = $user['name'];
                $exportWorkout[$i]['name'] = $work->name;
                if (isset($difficultys[$work->difficulty])) {
                    $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
                } else {
                    $exportWorkout[$i]['skill'] = 'N/a';
                }
                $exportWorkout[$i]['workoutId'] = $work->id;
                $exportWorkout[$i]['Inkeepers'] = $work->Inkeepers; //do we have records in keepers?
                $exportWorkout[$i]['InLiked'] = $work->InLiked; //do we like this workout
                $exportWorkout[$i]['countLikes'] = $work->countLikes;

                $sql = '  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id=' . $work->id . ' AND muscles.name IS NOT NULL';
                $muscles = DB::select($sql);

                ////
                $exportWorkout[$i]['muscles'] = $muscles;
///


                if ($work->cardio == 0) {
                    $exportWorkout[$i]['cardio'] = 'No';
                } else {
                    $exportWorkout[$i]['cardio'] = 'Yes';
                }

                $exportWorkout[$i]['image'] = $work->photo;


                /*
                            $exportWorkout[$i]['equipment'] =     $work->equipments()->get(['equipment.name']);;
                            $exportWorkout[$i]['muscles'] =     $work->muscles()->get(['muscles.name']);;
                */
                $i++;
            }
        } else {
            $exportWorkout = [];
        }
        return response()->json(['error' => false, 'workouts' => $exportWorkout]);

    }


    public function getUserWorkouts($userId, Request $request)
    {

        //  $user = Helpers::getUser($request);
        $user = User::find($userId);
        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }

        $sql = "SELECT workouts.*, workoutkeepers.id AS Inkeepers
                        FROM workouts
                        LEFT JOIN workoutkeepers ON
                         workoutkeepers.workout_id=workouts.id AND workoutkeepers.user_id=" . $userId . "
                                    WHERE workouts.user_id=" . $userId . "
                                    
                                    ORDER BY workouts.created_at DESC
                                    ";
        $workouts = DB::select($sql);


        //     $workouts = Workout::where('user_id', $user['id'])->get();

        $exportWorkout = [];
        $i = 0;
        foreach ($workouts as $work) {
            $exportWorkout[$i]['author'] = $user->username;
            $exportWorkout[$i]['name'] = $work->name;
            if (isset($difficultys[$work->difficulty])) {
                $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
            } else {
                $exportWorkout[$i]['skill'] = 'N/a';
            }
            $exportWorkout[$i]['workoutId'] = $work->id;
            $exportWorkout[$i]['Inkeepers'] = $work->Inkeepers;


            $sql = '  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id=' . $work->id . ' AND muscles.name IS NOT NULL';
            $muscles = DB::select($sql);

            ////
            $exportWorkout[$i]['muscles'] = $muscles;
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


    public function getWorkout(Request $request, $WorkoutId)
    {

        $user = Helpers::getUser($request);

        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }
        $workout = Workout::find($WorkoutId);

        $exportWorkout = [];

        if (isset($workout->user->name)) {
            $exportWorkout['author'] = $workout->user->name;
            $exportWorkout['authorAvatar'] = $workout->user->avatar;
        } else {
            $exportWorkout['author'] = '???';
            $exportWorkout['authorAvatar'] = '';
        }

        $exportWorkout['workoutId'] = $workout->id;
        $exportWorkout['name'] = $workout->name;
        $exportWorkout['countLikes'] = $workout->countLikes;
        $exportWorkout['Time'] = $workout->Time;


        if (isset($difficultys[$workout->difficulty])) {
            $exportWorkout['skill'] = $difficultys[$workout->difficulty];
        } else {
            $exportWorkout['skill'] = 'N/a';
        }


        $sql = '  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id=' . $workout->id . ' AND muscles.name IS NOT NULL';
        $muscles = DB::select($sql);

        ////
        $exportWorkout['muscles'] = $muscles;
///


        $sql = '  SELECT DISTINCT(equipment.name)
                    FROM exercise_to_workout
                    LEFT JOIN equipment_to_exercise ON equipment_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN equipment ON equipment_to_exercise.equipment_id =equipment.id
                    WHERE exercise_to_workout.workout_id=' . $workout->id . ' AND equipment.name IS NOT NULL';
        $equipment = DB::select($sql);
        $exportWorkout['equipment'] = $equipment;


        $sql = 'SELECT DISTINCT(tags.name)
                FROM workouts
                LEFT JOIN tags_to_workout ON tags_to_workout.workout_id =workouts.id
                LEFT JOIN tags ON tags_to_workout.tags_id =tags.id
                WHERE tags_to_workout.workout_id=' . $workout->id . ' AND  tags.name IS NOT NULL ';
        $tags = DB::select($sql);
        $exportWorkout['tags'] = $tags;


        $sql = 'SELECT id
                FROM workoutlikes
                WHERE workoutlikes.user_id =' . $user['id'] . '  AND workoutlikes.workout_id=' . $workout->id . ' 
                LIMIT 1 ';
        $liked = DB::select($sql);
        $exportWorkout['InLiked'] = $liked;


        $exportWorkout['cardio'] = $workout->cardio;
        $exportWorkout['image'] = $workout->photo;


        /*
                    $exportWorkout[$i]['equipment'] =     $work->equipments()->get(['equipment.name']);;
                    $exportWorkout[$i]['muscles'] =     $work->muscles()->get(['muscles.name']);;
        */


        return response()->json(['error' => false, 'workout' => $exportWorkout]);

    }


    public function getMyFavoritesWorkouts(Request $request)
    {

        $user = Helpers::getUser($request);
        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }

        $sql = '  SELECT workouts.*,  workoutkeepers.id AS Inkeepers,  workoutlikes.id  AS InLiked , users.name AS username
                FROM workoutlikes
                INNER JOIN workouts ON workouts.id =workoutlikes.workout_id
                 LEFT JOIN workoutkeepers ON
                         workoutkeepers.workout_id=workouts.id AND workoutkeepers.user_id=' . $user['id'] . '
                         
                   LEFT JOIN users ON users.id =workouts.user_id      
                WHERE workoutlikes.user_id=' . $user['id'] . '
                 
                 ORDER BY workouts.created_at DESC
                 
                 
                 LIMIT 20 ';


        $workouts = DB::select($sql);


        $workouts = DB::select($sql);
        $exportWorkout = [];
        $i = 0;
        foreach ($workouts as $work) {
            $exportWorkout[$i]['author'] = $work->username;
            $exportWorkout[$i]['name'] = $work->name;

            if (isset($difficultys[$work->difficulty])) {
                $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
            } else {
                $exportWorkout[$i]['skill'] = 'N/a';
            }
            $exportWorkout[$i]['workoutId'] = $work->id;
            $exportWorkout[$i]['Inkeepers'] = $work->Inkeepers;
            $exportWorkout[$i]['InLiked'] = $work->InLiked;
            $exportWorkout[$i]['countLikes'] = $work->countLikes;

            $sql = '  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id=' . $work->id . ' AND muscles.name IS NOT NULL';
            $muscles = DB::select($sql);
            ////
            $exportWorkout[$i]['muscles'] = $muscles;
///
            if ($work->cardio == 0) {
                $exportWorkout[$i]['cardio'] = 'No';
            } else {
                $exportWorkout[$i]['cardio'] = 'Yes';
            }
            $exportWorkout[$i]['image'] = $work->photo;
            /*
                        $exportWorkout[$i]['equipment'] =     $work->equipments()->get(['equipment.name']);;
                        $exportWorkout[$i]['muscles'] =     $work->muscles()->get(['muscles.name']);;
            */
            $i++;
        }
        return response()->json(['error' => false, 'workouts' => $exportWorkout]);
    }


    public function getUserFavoritesWorkouts($userId, Request $request)
    {

        //       $user = Helpers::getUser($request);
        $user = User::find($userId);
        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }

        $sql = '  SELECT workouts.*,  workoutkeepers.id AS Inkeepers
                FROM workoutlikes
                INNER JOIN workouts ON workouts.id =workoutlikes.workout_id
                 LEFT JOIN workoutkeepers ON
                         workoutkeepers.workout_id=workouts.id AND workoutkeepers.user_id=' . $userId . '
                WHERE workoutlikes.user_id=' . $userId . '
                 
                 ORDER BY workouts.created_at DESC
                 
                 LIMIT 20 ';


        $workouts = DB::select($sql);


        $workouts = DB::select($sql);
        $exportWorkout = [];
        $i = 0;
        foreach ($workouts as $work) {
            $exportWorkout[$i]['author'] = $user->username;
            $exportWorkout[$i]['name'] = $work->name;

            if (isset($difficultys[$work->difficulty])) {
                $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
            } else {
                $exportWorkout[$i]['skill'] = 'N/a';
            }

            $exportWorkout[$i]['workoutId'] = $work->id;
            $exportWorkout[$i]['Inkeepers'] = $work->Inkeepers;

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
        return response()->json(['error' => false, 'workouts' => $exportWorkout]);
    }

    public function getMyKeepersWorkouts(Request $request)
    {

        $user = Helpers::getUser($request);
        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }

        $sql = '  SELECT workouts.*,  workoutkeepers.id AS Inkeepers
                FROM workoutkeepers
                INNER JOIN workouts ON workouts.id =workoutkeepers.workout_id
                WHERE workoutkeepers.user_id=' . $user['id'] . "
                ORDER BY workoutkeepers.created_at DESC
                
                ";


        $workouts = DB::select($sql);
        $exportWorkout = [];
        $i = 0;
        foreach ($workouts as $work) {
            $exportWorkout[$i]['author'] = $user['username'];
            $exportWorkout[$i]['name'] = $work->name;

            if (isset($difficultys[$work->difficulty])) {
                $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
            } else {
                $exportWorkout[$i]['skill'] = 'N/a';
            }

            $exportWorkout[$i]['workoutId'] = $work->id;
            $exportWorkout[$i]['Inkeepers'] = $work->Inkeepers;
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
        return response()->json(['error' => false, 'workouts' => $exportWorkout]);
    }


    public function getFollowersWorkouts(Request $request)
    {

        $user = Helpers::getUser($request);
        $difficulty = Difficulty::all();
        foreach ($difficulty as $dif) {
            $difficultys[$dif->id] = $dif->name;
        }

        $sql = 'SELECT workouts.id, workouts.name, workouts.photo, workouts.countLikes, workouts.difficulty, workouts.cardio, users.name AS Username, users.avatar
, workoutlikes.id AS InLiked
FROM workouts
LEFT JOIN followers ON
 followers.following_user_id=workouts.user_id
LEFT JOIN users ON 
 users.id =workouts.user_id
LEFT JOIN workoutlikes ON 
 (workoutlikes.user_id =? AND workoutlikes.workout_id=workouts.id)
WHERE followers.follower_user_id =?
ORDER BY workouts.created_at DESC
                  
                  ';


        $workouts = DB::select($sql, [$user['id'], $user['id']]);


        //    $workouts = $curUser->FollowersWorkouts();

        //   print_r($workouts);
        //     return response()->json(['error' => false, 'workouts' => $workouts]);
        //    exit();
        $exportWorkout = [];
        $i = 0;
        foreach ($workouts as $work) {
            $exportWorkout[$i]['workoutId'] = $work->id;
            $exportWorkout[$i]['author'] = $work->Username;
            $exportWorkout[$i]['avatar'] = $work->avatar;
            $exportWorkout[$i]['name'] = $work->name;
            $exportWorkout[$i]['countLikes'] = $work->countLikes;
            $exportWorkout[$i]['InLiked'] = $work->InLiked;

            if (isset($difficultys[$work->difficulty])) {
                $exportWorkout[$i]['skill'] = $difficultys[$work->difficulty];
            } else {
                $exportWorkout[$i]['skill'] = 'N/a';
            }


            $sql = '  SELECT DISTINCT(muscles.name)
                    FROM exercise_to_workout
                    LEFT JOIN muscles_to_exercise ON muscles_to_exercise.exercise_id =exercise_to_workout.exercise_id
                    LEFT JOIN muscles ON muscles_to_exercise.muscles_id =muscles.id
                    WHERE exercise_to_workout.workout_id=' . $work->id . ' AND muscles.name IS NOT NULL';
            $muscles = DB::select($sql);

            ////
            $exportWorkout[$i]['muscles'] = $muscles;
///


            if ($work->cardio == 0) {
                $exportWorkout[$i]['cardio'] = 'No';
            } else {
                $exportWorkout[$i]['cardio'] = 'Yes';
            }

            $exportWorkout[$i]['image'] = $work->photo;


            /*
                        $exportWorkout[$i]['equipment'] =     $work->equipments()->get(['equipment.name']);;
                        $exportWorkout[$i]['muscles'] =     $work->muscles()->get(['muscles.name']);;
            */
            $i++;
        }

        return response()->json(['error' => false, 'workouts' => $exportWorkout]);

    }


    public function toogleLikes(Request $request)
    {

        $workout = Workout::find($request->workoutId);
        if (empty($workout)) {
            return response()->json(['error' => true, 'msg' => 'Cant found workout']);

        }
        $user = Helpers::getUser($request);
        if ($request->InLiked == null) {
            $likes = WorkoutLike::where('user_id', $user['id'])->where('workout_id', $request->workoutId)->first();
            if (!empty($likes)) {
                $likes->delete();
                if ($workout->countLikes > 0) {
                    $workout->countLikes--;
                    $workout->save();
                }
            }
        } else {
            WorkoutLike::create(['user_id' => $user['id'], 'workout_id' => $request->workoutId]);

            Activities::create(['user_id' => $user['id'], 'actionType' => 'liked', 'targetElementId' => $request->workoutId]);
            $workout->countLikes++;
            $workout->save();
        }
        return response()->json(['error' => false]);
    }


    public function toogleKeepers(Request $request)
    {
        $user = Helpers::getUser($request);
        if ($request->Inkeepers == null) {
            $likes = WorkoutKepers::where('user_id', $user['id'])->where('workout_id', $request->workoutId)->first();
            if (!empty($likes)) {
                $likes->delete();
            }
        } else {
            WorkoutKepers::create(['user_id' => $user['id'], 'workout_id' => $request->workoutId]);

        }
        return response()->json(['error' => false]);
    }


}
