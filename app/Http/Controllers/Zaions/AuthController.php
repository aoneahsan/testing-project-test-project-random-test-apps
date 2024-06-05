<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use App\Http\Resources\Zaions\UserResource;
use App\Models\User;
use App\Utils\AppHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function login(Request $request)
    {
        // Validate the incoming request for proper data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6|max:30' // as we have set this in frontend as well
        ]);

        $email = $request->get('email');
        $user = User::where('email', '=', $email)->first();
        if (!$user) {
            return AppHelper::sendNotFoundResponse([
                'email' => 'No User Found with provided details.'
            ]);
        } else {
            $password = $request->get('password');
            $passwordMatched = Hash::check($password, $user->password);

            if ($passwordMatched) {
                $userResource = UserResource::make($user);
                $authToken = $user->createToken('authToken');
                $authTokenCode = $authToken->plainTextToken;
                return AppHelper::sendSuccessResponse(['data' => $userResource, 'authToken' => $authTokenCode]);
            } else {
                // in case we do not want to tell user (in frontend), that a actual user exists in database with given email and only the password is invalid, then we can just send back "Not Found Response", it depends on business logic/requirements
                // here i'm sending back correct error messages based on the app/request state
                return AppHelper::sendBadRequestResponse(['password' => 'Invalid details!']);
            }
        }
    }

    function register(Request $request)
    {
        return response()->json(['success' => true]);
    }

    function logout(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->delete();
            return response()->json(['success' => true]);
        } catch (\Throwable $th) {
            return response()->json(['success' => false]);
        }
    }
}
