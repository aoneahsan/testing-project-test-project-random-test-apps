<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function getUserData()
    {
        return response()->json(['success' => true]);
    }

    function updateUserData()
    {
        return response()->json(['success' => true]);
    }
}
