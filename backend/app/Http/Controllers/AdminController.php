<?php

namespace App\Http\Controllers;

use App\Difficulty;
use App\Equipment;
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

        return view('admin.dashboard', ['tab'=>'dashboard']);

    }

    public function usermanager(Request $request)
    {

        $allUsers = User::all();
        return view('admin.usermanager', ['allusers' => $allUsers, 'tab'=>'usermanager']);
    }

    public function deleteUser(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $user = User::find($request->user);
        if (!empty($user)) {
            $user->delete();
            return response()->json(['error'=>false, 'msg'=>'User deleted']);
        }
    }

    public function defaults(){

        $allMuscles = Muscle::all();
        $allEquipment = Equipment::all();
        $allDifficulty = Difficulty::all();

        return view('admin.defaults', ['tab'=>'defaults', 'allMuscles'=>$allMuscles, 'allEquipment'=>$allEquipment, 'allDifficulty'=>$allDifficulty ]);
    }


    public function CatalogMuscles(Request $request)
    {
        $allMuscles = Muscle::all();
        return view('admin.muscles', ['allMuscles' => $allMuscles, 'tab'=>'muscles']);
    }

    public function AddMuscles(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message','Error');
        }

         Muscle::create(['name'=>$request->muscle]);
        return Redirect::back()->with('message','Operation Successful !');


    }

    public function DelMuscles(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $muscle = Muscle::find($request->muscle);
        if (!empty($muscle)) {
            $muscle->delete();
            return response()->json(['error'=>false, 'msg'=>'Muscle deleted']);
        }
    }


    public function CatalogEquipment(Request $request)
    {
        $allEquipment = Equipment::all();
        return view('admin.equipment', ['allEquipment' => $allEquipment, 'tab'=>'equipment']);
    }

    public function AddEquipment(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message','Error');
        }
        Equipment::create(['name'=>$request->equipment]);
        return Redirect::back()->with('message','Operation Successful !');
    }


    public function DelEquipment(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $equipment = Equipment::find($request->equipment);
        if (!empty($equipment)) {
            $equipment->delete();
            return response()->json(['error'=>false, 'msg'=>'equipment deleted']);
        }
    }



    public function CatalogDifficulties(Request $request)
    {
        $allDifficulty = Difficulty::all();
        return view('admin.difficulties', ['allDifficulty' => $allDifficulty, 'tab'=>'difficulties']);
    }

    public function AddDifficulties(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message','Error');
        }
        Difficulty::create(['name'=>$request->difficulty, 'difficulty_level'=>$request->level]);
        return Redirect::back()->with('message','Operation Successful !');
    }


    public function DelDifficulties(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $difficulty = Difficulty::find($request->difficulty);
        if (!empty($difficulty)) {
            $difficulty->delete();
            return response()->json(['error'=>false, 'msg'=>'dif deleted']);
        }
    }



    public function CatalogTags(Request $request)
    {
        $sql='SELECT tags.name, tags.id, COUNT(tags_to_workout.tags_id) AS popularity
                FROM tags
                LEFT JOIN tags_to_workout ON tags_to_workout.tags_id =tags.id
                GROUP BY tags.id
                ORDER BY popularity DESC';

        $allTags = DB::select($sql);
        return view('admin.tags', ['allTags' => $allTags, 'tab'=>'tags']);
    }

    public function AddTags(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return Redirect::back()->with('message','Error');
        }
        Tag::create(['name'=>$request->tagName]);
        return Redirect::back()->with('message','Operation Successful !');
    }


    public function DelTags(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $difficulty = Tag::find($request->tagId);
        if (!empty($difficulty)) {
            $difficulty->delete();
            return response()->json(['error'=>false, 'msg'=>'dif deleted']);
        }
    }



    public function getUserExercises(Request $request)
    {
        $exercises = Exercise::all();
        $exportExercise = [];
        $i = 0;
        foreach ($exercises as $ex) {
            $exportExercise[$i] = $ex;
            $exportExercise[$i]['equipment'] = $ex->equipments()->get(['equipment.name']);
            $exportExercise[$i]['muscles'] = $ex->muscles()->get(['muscles.name']);
            $exportExercise[$i]['user'] = $ex->user;
            $i++;
        }
        return view('admin.user_exercises', ['exportExercise' => $exportExercise, 'tab'=>'exercises']);
    }



    public function DelUserExercises(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $exercise = Exercise::find($request->exerciseId);
        if (!empty($exercise)) {
            $exercise->delete();
            return response()->json(['error'=>false, 'msg'=>'dif deleted']);
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
        return view('admin.user_workouts', ['exportWorkouts' => $workouts, 'tab'=>'workouts']);
    }



    public function DelUserWorkouts(Request $request)
    {
        $curUser = Auth::user();
        if ($curUser->role != 'admin') {
            return response()->json(['error'=>true, 'msg'=>'You are not allowed do this action']);
        }
        $workout = Workout::find($request->workoutId);
        if (!empty($workout)) {
            $workout->delete();
            return response()->json(['error'=>false, 'msg'=>'dif deleted']);
        }
    }



}
