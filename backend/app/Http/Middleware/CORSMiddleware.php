<?php

namespace App\Http\Middleware;

use Closure;

class CORSMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (isset($_SERVER['HTTP_ORIGIN'])) {

            $permit = true;
/*
            switch ($_SERVER['HTTP_ORIGIN']) {
                case 'some url':
                    $permit = true;
                    break;
                case 'some url':
                    $permit = true;
                    break;
            }
*/
            if ($permit == true) {
                return $next($request)
               ->header('Access-Control-Allow-Origin', $_SERVER['HTTP_ORIGIN'])
   //          ->header('Access-Control-Allow-Origin', '*')
                    ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                    ->header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')

                    ->header('Allow', 'GET, POST, PUT, DELETE, OPTIONS')
                    ;

            } else {
                return $next($request);
            }

        } else {
            return $next($request);
        }
    }
}
