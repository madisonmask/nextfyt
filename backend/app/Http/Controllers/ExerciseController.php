<?php

namespace App\Http\Controllers;

use App\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Intervention\Image\Image;
use Illuminate\Support\Facades\File;


class ExerciseController extends Controller
{
    //
    public function saveExercise(Request $request)
    {

        $user = Auth::user();

        if (empty($user)) {
            $user = ['id' => 0, 'username' => 'TESTuser', 'avatar' => '/assets/images/avatar.jpg', 'email' => 'fake@email.com', 'posts' => 0, 'followers' => 0, 'following' => 0];
            $user = (object)$user;
        }

        $savedImages = [0 => '', 1 => '', 2 => '', 3 => '', 4 => '', 5 => ''];
        $i = 0;

        $path=public_path() . '/pictures';
        if(!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }

        $path=public_path() . '/pictures/'. $user->id ;
        if(!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }




        foreach ($request->Images as $imagStr) {
            $image = base64_decode($imagStr);
            $imgName = "exercise-" . time() . ".png";
            $path = public_path() . '/pictures/' . $user->id . '/' . $imgName;
            Image::make($image->getRealPath())->save($path);
            $savedImages[$i] = $path;
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
            $createdExercise = Exercise::create(['name' => $request->Name, 'user_id' => $user->id, 'stage1_img' => $savedImages[0],
                'stage2_img' => $savedImages[1], 'stage3_img' => $savedImages[2],
                'stage4_img' => $savedImages[3], 'stage5_img' => $savedImages[4],
                'stage6_img' => $savedImages[5], 'repeat_count' => $repeat_count,
                'repeat_type' => $request->repeat_type,           // ['steps', 'movements']);
                'length_count' => $length_count,
                'length_type' => $request->length_type, //['Seconds', 'Minutes', 'Reps']);
            ]);
        } else {


        }



        return response()->json(['error' => false]);

    }
}
