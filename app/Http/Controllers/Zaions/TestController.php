<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;

class TestController extends Controller
{
    function testApi1()
    {
        return response()->json(['data' => 'okay from zaions from controller 2']);
    }
}
