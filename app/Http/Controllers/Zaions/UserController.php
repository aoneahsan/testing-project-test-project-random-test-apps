<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use App\Http\Resources\Zaions\UserResource;
use App\Models\User;
use App\Utils\AppHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    function getUserData(Request $request)
    {
        try {
            $user = $request->user();
            $userResource = UserResource::make($user);

            return AppHelper::sendSuccessResponse(['data' => $userResource]);
        } catch (\Throwable $th) {
            return AppHelper::sendRequestFailedResponse();
        }
    }

    function updateUserData(Request $request)
    {
        try {
            $user = $request->user();

            $user->update([
                'name' => $request->has('name') ? $request->get('name') : $user->name,
                'newsSources' => $request->has('newsSources') ? $request->get('newsSources') : $user->newsSources,
                'newsCategories' => $request->has('newsCategories') ? $request->get('newsCategories') : $user->newsCategories,
                'newsAuthors' => $request->has('newsAuthors') ? $request->get('newsAuthors') : $user->newsAuthors,
            ]);

            $updatedUserData = User::where('id', '=', $user->id)->first();

            $userResource = UserResource::make($updatedUserData);

            return AppHelper::sendSuccessResponse(['data' => $userResource]);
        } catch (\Throwable $th) {
            return AppHelper::sendRequestFailedResponse();
        }
    }

    function updateUserStatus(Request $request)
    {
        try {
            $user = $request->user();
            $currentDateTime = Carbon::now();

            $user->update([
                'lastActiveAt' => $currentDateTime
            ]);

            return AppHelper::sendSuccessResponse();
        } catch (\Throwable $th) {
            return AppHelper::sendRequestFailedResponse();
        }
    }
}
