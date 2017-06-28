<?php

namespace App\Http\Controllers;

use App\LandingSubscribe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LandingController extends Controller
{
  public function subscribe (Request $request){

      $email = $request->email;

      LandingSubscribe::create(['email'=>$email, 'is_new'=>1]);

      Mail::send('emails.landing', ['email' => $email], function ($m) use ($email) {
          $m->from('madison@nextfyt.com', 'Site admin');
          $m->cc('madison@nextfyt.com');
          $m->to($email, $email)->subject('Test email!');
      });


      return view('welcome',['new'=>false]);
  }
}
