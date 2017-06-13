<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Exeption;
use App\Http\Controllers\Helpers;
class UserProfileController extends Controller
{


    public function __construct()
    {
        // Apply the jwt.auth middleware to all methods in this controller
        // except for the authenticate method. We don't want to prevent
        // the user from retrieving their token if they don't already have it
//      $this->middleware('jwt.auth', ['except' => ['authenticate']]);
    }





/*
    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
      } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());

        } catch (\Exception $e){
    //        return response()->json(['error'=>true]);
            $user=['id'=>0, 'username'=>'TESTuser', 'avatar'=>'/assets/images/avatar.jpg', 'email'=>'fake@email.com', 'posts'=>0,'followers'=>0, 'following'=>0];
        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }
*/












    public function getProfile(Request $request){
        $user= Helpers::getUser($request);
/*
      try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
     //       return response()->json(['token_absent'], $e->getStatusCode());

       } catch (\Exception $e){
            //        return response()->json(['error'=>true]);
            $user=['id'=>0, 'username'=>'TESTuser', 'avatar'=>'/assets/images/avatar.jpg', 'email'=>'fake@email.com', 'posts'=>0,'followers'=>0, 'following'=>0];
        }

        */
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));

    }
}
