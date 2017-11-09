<?php

namespace App\Http\Controllers;

use App\Activities;
use App\Notifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Exeption;
use App\Http\Controllers\Helpers;
use App\User;
use App\Followers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image;


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

    /*
        public function getProfileData(Request $request)
        {
            $user = Helpers::getUser($request);
          //  print_r($user['id']);
         //   exit()




        }
    */

    public function getProfile(Request $request)
    {
        $user = Helpers::getUser($request);
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


    /**
     * useles function now. maybe we can found somthing useful  for them later
     * @param Request $request
     * @param $userId
     * @return  Json
     */
    public function getPublicProfile(Request $request, $userId)
    {
        $user = Helpers::getUser($request);
        $targetUser = User::where('id', $userId)->first(['avatar', 'followers', 'following', 'id', 'name', 'posts']);

        return response()->json(['error' => false, 'user' => $targetUser]);
    }


    public function FollowUser(Request $request, $userId)
    {
        $user = Helpers::getUser($request);
        $following = Followers::where('follower_user_id', $user['id'])->where('following_user_id', $userId)->first();
        if (empty($following)) {
            Followers::create(['follower_user_id' => $user['id'], 'following_user_id' => $userId]);

            Activities::create(['user_id' => $user['id'], 'actionType' => 'followed', 'targetElementId' => $userId]);
            //    Notifications::create(['user_id' => $userId, 'user_id_who_make_action' => $user['id'], 'actionType' => 'followed']);

            $userWhoFollow = User::find($user['id']);
            $userWhoFollow->following++;
            $userWhoFollow->save();

            $user2 = User::find($userId);
            $user2->followers++;
            $user2->save();

        }


        return response()->json(['error' => false]);
    }

    public function unFollowUser(Request $request, $userId)
    {
        $user = Helpers::getUser($request);
        $following = Followers::where('follower_user_id', $user['id'])->where('following_user_id', $userId)->first();
        if (empty($following)) {

            return response()->json(['error' => false]);
            Followers::create(['follower_user_id' => $user['id'], 'following_user_id' => $userId]);

            Activities::create(['user_id' => $user['id'], 'actionType' => 'followed', 'targetElementId' => $userId]);
            //    Notifications::create(['user_id' => $userId, 'user_id_who_make_action' => $user['id'], 'actionType' => 'followed']);

            $userWhoFollow = User::find($user['id']);
            $userWhoFollow->following++;
            $userWhoFollow->save();

            $user2 = User::find($userId);
            $user2->followers++;
            $user2->save();

        } else {
            $following->delete();
            Activities::create(['user_id' => $user['id'], 'actionType' => 'unfollowed', 'targetElementId' => $userId]);
            //    Notifications::create(['user_id' => $userId, 'user_id_who_make_action' => $user['id'], 'actionType' => 'followed']);

            $userWhoFollow = User::find($user['id']);
            $userWhoFollow->following--;
            $userWhoFollow->save();

            $user2 = User::find($userId);
            $user2->followers--;
            $user2->save();

        }


        return response()->json(['error' => false]);
    }


    public function checkFollow(Request $request, $userId)
    {
        $user = Helpers::getUser($request);
        $following = Followers::where('follower_user_id', $user['id'])->where('following_user_id', $userId)->first();
        if (empty($following)) {
            return response()->json(['followed' => false]);

        } else {
            return response()->json(['followed' => true]);

        }

    }


    public function saveProfile(Request $request)
    {
        $user = Helpers::getUser($request);


        if ($user['id'] != $request->id) {
            return response()->json(['error' => true, 'msg' => 'Wrong user id']);
        }

        $curentUser = User::find($user['id']);
        if (!empty($request->email)) {
            $curentUser->email = $request->email;
        }


        if (!empty($request->name)) {
            $curentUser->name = $request->name;
        }
        if (!empty($request->age)) {
            $curentUser->Age = $request->age;
        }
        if (!empty($request->firstname)) {
            $curentUser->FirstName = $request->firstname;
        }
        if (!empty($request->lastname)) {
            $curentUser->LastName = $request->lastname;
        }

        if (!empty($request->old_password)) {

            if (Hash::check($request->old_password, $curentUser->password)) {

                if ($request->new_password == $request->new_password2) {
                    $curentUser->password = Hash::make($request->new_password);

                } else {
                    return response()->json(['error' => true, 'msg' => 'New password dont match']);
                }


            } else {
                return response()->json(['error' => true, 'msg' => 'You enter wrong password']);
            }


        }

        if (isset($request->ImageData) and !empty($request->ImageData)) {


            $path = public_path() . '/pictures';
            if (!File::exists($path)) {
                File::makeDirectory($path, $mode = 0777, true, true);
            }
            $path = public_path() . '/pictures/' . $user['id'];
            if (!File::exists($path)) {
                File::makeDirectory($path, $mode = 0777, true, true);
            }

            $imagStr = $request->ImageData;
            if (!empty($imagStr)) {
                $image = base64_decode($imagStr);
                $imgName = "avatar-" . time() ;
             //   $webPath = '/pictures/' . $user['id'] . '/' . $imgName;
             //   $path = public_path() . $webPath;
                //     Image::make($image->getRealPath())->save($path);
              //  file_put_contents($path, $image);
           //     $photo = $webPath;

                $imageToWork  =   Image::make($image);
                $imageToWork->save( public_path() . '/pictures/' . $user['id'] . '/'.$imgName.'.jpg' );


                $imageToWork->resize(800, 600,function ($constraint) {
                    $constraint->upsize();
                });
                $imageToWork->save( public_path() . '/pictures/' . $user['id'] . '/'.$imgName.'_m.jpg' );


                $imageToWork->resize(186, 140,function ($constraint) {
                    $constraint->upsize();
                });
                $imageToWork->save( public_path() . '/pictures/' . $user['id'] . '/'.$imgName.'_s.jpg' );
                $photo = '/pictures/' . $user['id'] . '/' . $imgName;

            } else {
                $photo = '';
            }

            $curentUser->avatar = $photo;

        }


        $curentUser->save();

        return response()->json(['error' => false]);

    }

}
