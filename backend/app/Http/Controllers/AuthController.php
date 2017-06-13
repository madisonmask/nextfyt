<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Illuminate\Support\Facades\Auth;
//use JWTAuth;
use Tymon\JWTAuthExceptions\JWTException;

use Tymon\JWTAuth\Facades\JWTAuth;



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
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            $msg = '';
            foreach ($errors->all() as $message) {
                $msg .= ' ' . $message;
            }
            return response()->json(['error' => true, 'msg' => $msg]);
        }


        $user= User::create([
            'name' => $request->Name,
            'email' => $request->Email,
            'password' => bcrypt($request->Password),
        ]);

        //@todo create check for email
        if(empty($user)){
            return response()->json(['error' => true, 'msg' => 'Cant create user']);
        }




        /*
        Auth::login($user);

        return response()->json(['error' => false, 'user' => $user]);

*/


        try {
            // verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt(['email'=>$request->Email, 'password'=>$request->Password])) {
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
            if (! $token = JWTAuth::attempt($credentials)) {
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
