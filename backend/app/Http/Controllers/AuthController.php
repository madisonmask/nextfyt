<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
//use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;


class AuthController extends Controller
{
    //
    /*
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

           Auth::login($user, true);


   //         $user = Auth::user();
  //          var_dump($user);
            return response()->json(['error' => false, 'user' => $user]);


        } else {
            return response()->json(['error' => true, 'msg' => 'Wrong credentials']);
        }


    }
*/
    public function doRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Name' => 'required|string|max:255',
            'Email' => 'required|string|email|max:255|unique:users',
            'Password' => 'required|string|min:6|confirmed',
            'Role' => 'required',
            'Accept' => 'accepted',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $msg = '';
            foreach ($errors->all() as $message) {
                $msg .= ' ' . $message;
            }
            return response()->json(['error' => true, 'msg' => $msg]);
        }


        $user = User::create([
            'name' => $request->Name,
            'email' => $request->Email,
            'password' => bcrypt($request->Password),
            'role' => $request->Role
        ]);

        //@todo create check for email
        if (empty($user)) {
            return response()->json(['error' => true, 'msg' => 'Cant create user']);
        }


        /*
        Auth::login($user);

        return response()->json(['error' => false, 'user' => $user]);

*/


        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt(['email' => $request->Email, 'password' => $request->Password])) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));


    }

    public function doPasswordReset(Request $request)
    {


    }


    public function doLogin(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }


    public function doFBLogin(Request $request)
    {
        //find user with this email
        $user = User::where('email', $request->email)->first();

        if (empty($user)) {
            //so create them


            $password = $string = str_random(8);
            $curentUser = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($password),
                'role' => 'user'
            ]);

            //@todo sen user email with password!!!
            if (empty($curentUser)) {
                return response()->json(['error' => true, 'msg' => 'Cant create user']);
            }


            $path = public_path() . '/pictures';
            if (!File::exists($path)) {
                File::makeDirectory($path, $mode = 0777, true, true);
            }
            $path = public_path() . '/pictures/' . $user['id'];
            if (!File::exists($path)) {
                File::makeDirectory($path, $mode = 0777, true, true);
            }
            $imgName = "avatar-" . time() . ".png";
            $webPath = '/pictures/' . $user['id'] . '/' . $imgName;
            $path = public_path() . $webPath;
            $image = file_get_contents($request->picture);
            if (strlen($image) > 100) {
                file_put_contents($path, $image);
                $photo = $webPath;
                $curentUser->avatar = $photo;
                $curentUser->save();

            }


            /*
            Auth::login($user);

            return response()->json(['error' => false, 'user' => $user]);

    */


            try {
                // verify the credentials and create a token for the user
                if (!$token = JWTAuth::attempt(['email' => $request->email, 'password' => $password])) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                // something went wrong
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            // if no errors are encountered we can return a JWT
            return response()->json(compact('token'));


        } else {
            //so login them

            try {
                // verify the credentials and create a token for the user
                if (!$token = JWTAuth::fromUser($user)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                // something went wrong
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            // if no errors are encountered we can return a JWT
            return response()->json(compact('token'));

        }


    }


}
