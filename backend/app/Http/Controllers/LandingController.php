<?php

namespace App\Http\Controllers;

use App\LandingSubscribe;
use Illuminate\Http\Request;

class LandingController extends Controller
{
  public function subscribe (Request $request){

      $email = $request->email;

      LandingSubscribe::create(['email'=>$email, 'is_new'=>1]);

      return view('welcome',['new'=>false]);
  }
}
