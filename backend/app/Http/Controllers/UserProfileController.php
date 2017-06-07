<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    //
    public function getProfile(){
        $user=Auth::user();

        if(empty($user)){
            $user=['id'=>0, 'username'=>'TESTuser', 'avatar'=>'/assets/images/avatar.jpg', 'email'=>'fake@email.com', 'posts'=>0,'followers'=>0, 'following'=>0];
        }
          return response()->json($user);
    }
}
