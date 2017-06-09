<?php

namespace App\Http\Controllers;

use App\Difficulty;
use App\Equipment;
use App\Muscle;
use Illuminate\Http\Request;

class CatalogController extends Controller
{

    /**
     * Get list of all stored data
     * @return mixed
     */
    public function getCatalog()
    {
        $muscles = Muscle::all(['id','name']);
        $Difficulty = Difficulty::all(['id','name']);
        $equipment = Equipment::all(['id','name']);
        return response()->json(['error' => false, 'muscles' => $muscles, 'Difficulty' => $Difficulty, 'equipment' => $equipment]);
    }
}
