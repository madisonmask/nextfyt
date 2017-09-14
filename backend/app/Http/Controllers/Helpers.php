<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Helpers;
use Illuminate\Support\Facades\DB;

class Helpers extends Controller
{


    public static function getUser(Request $request)
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                //   return response()->json(['user_not_found'], 404);
                $user = ['id' => 0, 'username' => 'TESTuser', 'avatar' => '/assets/images/avatar.jpg', 'email' => 'fake@email.com', 'posts' => 0, 'followers' => 0, 'following' => 0];
            }
            //       return response()->json(['token_absent'], $e->getStatusCode());

        } catch (\Exception $e) {
            $user = ['id' => 0, 'username' => 'TESTuser', 'avatar' => '/assets/images/avatar.jpg', 'email' => 'fake@email.com', 'posts' => 0, 'followers' => 0, 'following' => 0];
        }
        return $user;
    }


    public static function getMyFollowers($userId)
    {

        $sql = 'SELECT users.name, users.id, users.avatar, users.email
                FROM followers
                LEFT JOIN users ON users.id =followers.following_user_id
                WHERE followers.follower_user_id =? AND users.id IS NOT NULL
                GROUP BY (users.id)';

        $res = DB::select($sql, [$userId]);

        $users = [];
        foreach ($res as $user) {
            $users[$user->id] = ['avatar' => $user->avatar,
                'email' => $user->email,
                'name' => $user->name
            ];
        }
        return $users;


    }

}
