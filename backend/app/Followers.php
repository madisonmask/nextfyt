<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Followers extends Model
{
    protected $guarded = ['id'];
    protected $table='followers';

}
