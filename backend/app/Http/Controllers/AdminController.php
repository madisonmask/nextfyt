<?php

namespace App\Http\Controllers;

use App\Difficulty;
use App\Equipment;
use App\ExercisesDefault;
use App\Muscle;
use App\Tag;
use App\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\User;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use App\Exercise;
use Illuminate\Support\Facades\File;
use App\MusclesToExercise;
use App\EquipmentToExercise;

class AdminController extends Controller
{
    public function doLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Email' => 'required|email',
            'Password' => 'required',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $msg = '';
            foreach ($errors->all() as $message) {
                $msg .= ' ' . $message;
            }
            return response()->json(['error' => true, 'msg' => $msg]);
        }


        if (Auth::attempt(['email' => $request->Email, 'password' => $request->Password])) {
            // Authentication passed...

            $user = User::where('email', $request->Email)->first();

            if ($user->role != 'admin') {
                return view('admin.login');
            }

            Auth::login($user, true);


            $user = Auth::user();
            return redirect('/adminpanel/dashboard');


        } else {
            return view('admin.login');
        }
    }


    public function dashboard(Request $request)
    {

        return view('admin.dashboard', ['tab' => 'dashboard']);

    }

    public function usermanager(Request $request)
    {

        $allUsers = User::all();
        return view('admin.usermanager', ['allusers' => $allUsers, 'tab' => 'usermanager']);
    }

    public function deleteUser(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $user = User::find($request->user);
        if (!empty($user)) {
            $user->delete();
            return response()->json(['error' => false, 'msg' => 'User deleted']);
        }
    }

    public function defaults()
    {

        $allMuscles = Muscle::all();
        $allEquipment = Equipment::all();
        $allDifficulty = Difficulty::all();
        $allDefault =  Exercise::where('is_default',1)->get();

        return view('admin.defaults', ['tab' => 'defaults', 'allMuscles' => $allMuscles, 'allEquipment' => $allEquipment, 'allDifficulty' => $allDifficulty, 'allDefault' => $allDefault]);
    }


    public function CatalogMuscles(Request $request)
    {
        $allMuscles = Muscle::all();
        return view('admin.muscles', ['allMuscles' => $allMuscles, 'tab' => 'muscles']);
    }

    public function AddMuscles(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message', 'Error');
        }

        Muscle::create(['name' => $request->muscle]);
        return Redirect::back()->with('message', 'Operation Successful !');


    }

    public function DelMuscles(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $muscle = Muscle::find($request->muscle);
        if (!empty($muscle)) {
            $muscle->delete();
            return response()->json(['error' => false, 'msg' => 'Muscle deleted']);
        }
    }


    public function CatalogEquipment(Request $request)
    {
        $allEquipment = Equipment::all();
        return view('admin.equipment', ['allEquipment' => $allEquipment, 'tab' => 'equipment']);
    }

    public function AddEquipment(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message', 'Error');
        }
        Equipment::create(['name' => $request->equipment]);
        return Redirect::back()->with('message', 'Operation Successful !');
    }


    public function DelEquipment(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $equipment = Equipment::find($request->equipment);
        if (!empty($equipment)) {
            $equipment->delete();
            return response()->json(['error' => false, 'msg' => 'equipment deleted']);
        }
    }


    public function CatalogDifficulties(Request $request)
    {
        $allDifficulty = Difficulty::all();
        return view('admin.difficulties', ['allDifficulty' => $allDifficulty, 'tab' => 'difficulties']);
    }

    public function AddDifficulties(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message', 'Error');
        }
        Difficulty::create(['name' => $request->difficulty, 'difficulty_level' => $request->level]);
        return Redirect::back()->with('message', 'Operation Successful !');
    }


    public function DelDifficulties(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $difficulty = Difficulty::find($request->difficulty);
        if (!empty($difficulty)) {
            $difficulty->delete();
            return response()->json(['error' => false, 'msg' => 'dif deleted']);
        }
    }


    public function CatalogTags(Request $request)
    {
        $sql = 'SELECT tags.name, tags.id, COUNT(tags_to_workout.tags_id) AS popularity
                FROM tags
                LEFT JOIN tags_to_workout ON tags_to_workout.tags_id =tags.id
                GROUP BY tags.id
                ORDER BY popularity DESC';

        $allTags = DB::select($sql);
        return view('admin.tags', ['allTags' => $allTags, 'tab' => 'tags']);
    }

    public function AddTags(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message', 'Error');
        }
        Tag::create(['name' => $request->tagName]);
        return Redirect::back()->with('message', 'Operation Successful !');
    }


    public function DelTags(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $difficulty = Tag::find($request->tagId);
        if (!empty($difficulty)) {
            $difficulty->delete();
            return response()->json(['error' => false, 'msg' => 'dif deleted']);
        }
    }


    public function getUserExercises(Request $request)
    {
        $exercises = Exercise::where('is_default',0)->get();
        $exportExercise = [];
        $i = 0;
        foreach ($exercises as $ex) {
            $exportExercise[$i] = $ex;
            $exportExercise[$i]['equipment'] = $ex->equipments()->get(['equipment.name']);
            $exportExercise[$i]['muscles'] = $ex->muscles()->get(['muscles.name']);
            $exportExercise[$i]['user'] = $ex->user;
            $i++;
        }
        return view('admin.user_exercises', ['exportExercise' => $exportExercise, 'tab' => 'exercises']);
    }


    public function DelUserExercises(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $exercise = Exercise::find($request->exerciseId);
        if (!empty($exercise)) {
            $exercise->delete();
            return response()->json(['error' => false, 'msg' => 'dif deleted']);
        }
    }


    public function getUserWorkouts(Request $request)
    {
        $workouts = Workout::all();
        /*  $exportExercise = [];
          $i = 0;
          foreach ($exercises as $ex) {
              $exportExercise[$i] = $ex;
              $exportExercise[$i]['equipment'] = $ex->equipments()->get(['equipment.name']);
              $exportExercise[$i]['muscles'] = $ex->muscles()->get(['muscles.name']);
              $exportExercise[$i]['user'] = $ex->user;
              $i++;
          }*/
        return view('admin.user_workouts', ['exportWorkouts' => $workouts, 'tab' => 'workouts']);
    }


    public function DelUserWorkouts(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error' => true, 'msg' => 'You are not allowed do this action']);
        }
        $workout = Workout::find($request->workoutId);
        if (!empty($workout)) {
            $workout->delete();
            return response()->json(['error' => false, 'msg' => 'dif deleted']);
        }
    }


    public function saveDefaults(Request $request)
    {

        $curUser = Auth::user();

        $validator = Validator::make($request->all(), [
            'exerciseName' => 'required|max:255',
            'length_count' => 'required'
        ]);

        $muscles = $request->muscles;

        if (empty($muscles)) {
            $validator->errors()->add('muscles', 'Select at least 1 muscle');
            return redirect('adminpanel/defaults')
                ->withErrors($validator)
                ->withInput();

        }

        $difficulties = $request->difficulties;

        if (empty($difficulties)) {
            $validator->errors()->add('difficulties', 'Select difficulties');
            return redirect('adminpanel/defaults')
                ->withErrors($validator)
                ->withInput();

        }


        if ($validator->fails()) {

            return redirect('adminpanel/defaults')
                ->withErrors($validator)
                ->withInput();
        }

        $equipments = $request->equipment;

        if (!isset($request->cardio)) {
            $cardio = 0;
        } else {
            $cardio = $request->cardio;
        }


        $path = public_path() . '/pictures';
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }

        $path = public_path() . '/pictures/defaults/';
        if (!File::exists($path)) {
            File::makeDirectory($path, $mode = 0777, true, true);
        }

        $stage1_img = $stage2_img = $stage3_img = $stage4_img = $stage5_img = $stage6_img = '';
        if ($request->hasFile('file1')) {
            if ($request->file('file1')->isValid()) {
                $extension = $request->file1->extension();
                $imgName = time() . "exercise1." . $extension;
                $file = $request->file1->move('pictures/defaults/', $imgName);
                if ($file) {
                    $stage1_img = $file->getPathname();
                }
            }
        }

        if ($request->hasFile('file2')) {
            if ($request->file('file2')->isValid()) {
                $extension = $request->file2->extension();
                $imgName = time() . "exercise2." . $extension;
                $file = $request->file2->move('pictures/defaults/', $imgName);
                if ($file) {
                    $stage2_img = $file->getPathname();
                }
            }
        }


        if ($request->hasFile('file3')) {
            if ($request->file('file3')->isValid()) {
                $extension = $request->file3->extension();
                $imgName = time() . "exercise3." . $extension;
                $file = $request->file3->move('pictures/defaults/', $imgName);
                if ($file) {
                    $stage3_img = $file->getPathname();
                }
            }
        }

        if ($request->hasFile('file4')) {
            if ($request->file('file4')->isValid()) {
                $extension = $request->file4->extension();
                $imgName = time() . "exercise4." . $extension;
                $file = $request->file4->move('pictures/defaults/', $imgName);
                if ($file) {
                    $stage4_img = $file->getPathname();
                }
            }
        }

        if ($request->hasFile('file5')) {
            if ($request->file('file5')->isValid()) {
                $extension = $request->file5->extension();
                $imgName = time() . "exercise5." . $extension;
                $file = $request->file5->move('pictures/defaults/', $imgName);
                if ($file) {
                    $stage5_img = $file->getPathname();
                }
            }
        }

        if ($request->hasFile('file6')) {
            if ($request->file('file6')->isValid()) {
                $extension = $request->file6->extension();
                $imgName = time() . "exercise6." . $extension;
                $file = $request->file6->move('pictures/defaults/', $imgName);
                if ($file) {
                    $stage6_img = $file->getPathname();
                }
            }
        }


        $createdExercise = Exercise::create( ['user_id'=>$curUser->id, 'name' => $request->exerciseName, 'stage1_img' => $stage1_img, 'stage2_img' => $stage2_img,
            'stage3_img' => $stage3_img, 'stage4_img' => $stage4_img, 'stage5_img' => $stage5_img, 'stage6_img' => $stage6_img,
            'repeat_count' => $request->repeat_count, 'repeat_type' => $request->repeat_type, 'length_count' => $request->length_count, 'length_type' => $request->length_type,
            'cardio' => $cardio, 'Difficulty' => $request->difficulties, 'is_default'=>1

        ]);


        foreach ($muscles as $m) {
            $muscles = MusclesToExercise::create(['muscles_id' => $m, 'exercise_id' => $createdExercise->id]);
        }


        foreach ($equipments as $e) {
            $muscles = EquipmentToExercise::create(['equipment_id' => $e, 'exercise_id' => $createdExercise->id]);
        }


        return redirect('adminpanel/defaults');


    }

}
