<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Helpers;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{


    public function getMyNews(Request $request)
    {


        $user = Helpers::getUser($request);

        $followers = Helpers::getMyFollowers($user['id']);

        $sql = '
SELECT activities.id, activities.actionType, activities.user_id AS UserIdActivities, activities.updated_at AS DATE, users.name AS UserName, users.avatar AS UserAvatar, workouts.name AS WorkoutName, workouts.photo AS WorkoutFoto
FROM activities
LEFT JOIN users ON
 users.id =activities.targetElementId
LEFT JOIN workouts ON 
 workouts.id =activities.targetElementId
 
WHERE 


 activities.user_id =?
ORDER BY activities.updated_at DESC

';

        $notifycations = DB::select($sql, [$user['id']]);

        $news = [];
        foreach ($notifycations as $notify) {
            if (isset($followers[$notify->UserIdActivities])) {
                $notify->User = $followers[$notify->UserIdActivities];
            } else if ($notify->UserIdActivities == $user['id']) {

                $notify->User = $user;
            } else {
                $notify->User = ['avatar' => '',
                    'email' => 'fake@email',

                    'name' => 'TestUsder'
                ];


            }

            $notify->actionType = trim($notify->actionType);
            $news[] = $notify;
        }
        return response()->json(['error' => false, 'news' => $news, 'followers' => $followers]);
    }



    public function getFollowedNews(Request $request)
    {


        $user = Helpers::getUser($request);

        $followers = Helpers::getMyFollowers($user['id']);

        $sql = '
SELECT activities.id, activities.actionType, activities.user_id AS UserIdActivities, activities.updated_at AS DATE, users.name AS UserName, users.avatar AS UserAvatar, workouts.name AS WorkoutName, workouts.photo AS WorkoutFoto
FROM activities
LEFT JOIN users ON
 users.id =activities.targetElementId
LEFT JOIN workouts ON 
 workouts.id =activities.targetElementId
 
WHERE 


 activities.user_id  IN
 
 (
 Select followers.following_user_id
 from followers
 where followers.follower_user_id =?
 
 
 )
 
 
 
 
ORDER BY activities.updated_at DESC

';

        $notifycations = DB::select($sql, [$user['id']]);

        $news = [];
        foreach ($notifycations as $notify) {
            if (isset($followers[$notify->UserIdActivities])) {
                $notify->User = $followers[$notify->UserIdActivities];
            } else if ($notify->UserIdActivities == $user['id']) {

                $notify->User = $user;
            } else {
                $notify->User = ['avatar' => '',
                    'email' => 'fake@email',

                    'name' => 'TestUsder'
                ];


            }

            $notify->actionType = trim($notify->actionType);
            $news[] = $notify;
        }
        return response()->json(['error' => false, 'news' => $news, 'followers' => $followers]);
    }


}
