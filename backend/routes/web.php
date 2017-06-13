<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['prefix' => 'api'  ] , function () {

    Route::post('/login', 'AuthController@doLogin' );
    Route::post('/register', 'AuthController@doRegister' );
    Route::post('/passwordReset', 'AuthController@doPasswordReset' );



    Route::post('/loginj', 'AuthController@authenticate' );


    Route::get('/profile', 'UserProfileController@getProfile' );

    Route::post('/exercise', 'ExerciseController@saveExercise' );
    Route::get('/exercise', 'ExerciseController@getExercises' );
    Route::get('/exercise/new', 'ExerciseController@getExercisesNew' );
    Route::get('/exercise/default', 'ExerciseController@getExercisesDefault' );

    Route::get('/catalog', 'CatalogController@getCatalog' );

    Route::post('/workout', 'WorkoutController@saveWorkout' );
    Route::get('/workouts/my', 'WorkoutController@getMyWorkouts' );

    Route::get('/workouts/followers', 'WorkoutController@getFollowersWorkouts' );//use for home tab


});
