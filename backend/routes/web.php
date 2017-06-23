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


Route::group(['prefix' => 'api'], function () {
    Route::post('/login', 'AuthController@doLogin');
    Route::post('/register', 'AuthController@doRegister');
    Route::post('/passwordReset', 'AuthController@doPasswordReset');
    Route::post('/loginj', 'AuthController@authenticate');
    Route::get('/profile', 'UserProfileController@getProfile');
    Route::post('/profile', 'UserProfileController@saveProfile');
    Route::get('/profile/{userId}', 'UserProfileController@getPublicProfile');
    Route::get('/profile/follow/{userId}', 'UserProfileController@FollowUser');
    Route::post('/exercise', 'ExerciseController@saveExercise');
    Route::get('/exercises', 'ExerciseController@getExercises');
    Route::get('/exercise/new', 'ExerciseController@getExercisesNew');
    Route::get('/exercise/{exerciseId}', 'ExerciseController@getExercise');
    Route::post('/exercise/makenew', 'ExerciseController@setExercisesNew');
    Route::post('/exercise/makeold', 'ExerciseController@setExercisesOld');
    Route::delete('/exercise/{exerciseId}', 'ExerciseController@deleteExercise');
    Route::get('/exercises/{workoutId}', 'ExerciseController@getExercisesForWorkout'); // Get all exercise list for given workout
    Route::get('/exercise/default', 'ExerciseController@getExercisesDefault');
    Route::get('/catalog', 'CatalogController@getCatalog');
    Route::post('/workout', 'WorkoutController@saveWorkout');
    Route::post('/workout/likes', 'WorkoutController@toogleLikes');
    Route::post('/workout/keepers', 'WorkoutController@toogleKeepers');
    Route::get('/workout/{WorkoutId}', 'WorkoutController@getWorkout');

    Route::get('/workouts/my', 'WorkoutController@getMyWorkouts');
    Route::get('/workouts/user/{userId}', 'WorkoutController@getUserWorkouts');

    Route::get('/workouts/myFavorites', 'WorkoutController@getMyFavoritesWorkouts');
    Route::get('/workouts/Favorites/{userId}', 'WorkoutController@getUserFavoritesWorkouts');

    Route::get('/workouts/myKeepers', 'WorkoutController@getMyKeepersWorkouts');
    Route::get('/workouts/followers', 'WorkoutController@getFollowersWorkouts');//use for home tab

    Route::get('/news', 'NotificationController@getMyNews');



    Route::post('/search', 'SearchController@makeSearch');
});



Route::group(['prefix' => 'adminpanel'], function () {

    Route::get('/', function(){
        return view('admin.login');
    });
    Route::post('/login', 'AdminController@doLogin' );

});

Route::group(['prefix' => 'adminpanel', 'middleware' => ['CheckIfAdmin']], function () {


    Route::get('/dashboard', 'AdminController@dashboard' );
    Route::get('/usermanager', 'AdminController@usermanager' );
    Route::post('/usermanager/delete', 'AdminController@deleteUser' );
    Route::get('/defaults', 'AdminController@defaults' );

    Route::get('/catalog/muscles', 'AdminController@CatalogMuscles' );
    Route::post('/catalog/muscles/add', 'AdminController@AddMuscles' );
    Route::post('/catalog/muscles/delete', 'AdminController@DelMuscles' );

    Route::get('/catalog/equipment', 'AdminController@CatalogEquipment' );
    Route::post('/catalog/equipment/add', 'AdminController@AddEquipment' );
    Route::post('/catalog/equipment/delete', 'AdminController@DelEquipment' );



    Route::get('/catalog/difficulty', 'AdminController@CatalogDifficulties' );
    Route::post('/catalog/difficulty/add', 'AdminController@AddDifficulties' );
    Route::post('/catalog/difficulty/delete', 'AdminController@DelDifficulties' );



    Route::get('/catalog/tags', 'AdminController@CatalogTags' );
    Route::post('/catalog/tags/add', 'AdminController@AddTags' );
    Route::post('/catalog/tags/delete', 'AdminController@DelTags' );


    Route::get('/content/exercises', 'AdminController@getUserExercises' );
    Route::post('/content/exercises/delete', 'AdminController@DelUserExercises' );

    Route::get('/content/workouts', 'AdminController@getUserWorkouts' );
    Route::post('/content/workouts/delete', 'AdminController@DelUserWorkouts' );

});