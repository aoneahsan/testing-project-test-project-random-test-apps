<?php

namespace App\Http\Controllers\Zaions;

use App\Http\Controllers\Controller;
use App\Http\Resources\Zaions\UserResource;
use App\Models\User;
use App\Utils\AppHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        $request->validate([
            'name' => 'nullable|string',
        ]);

        try {
            $user = $request->user();

            $requestContainsSomeData = $request->has('name'); // we will check for other fields once added
            if ($requestContainsSomeData) {
                $user->update([
                    'name' => $request->has('name') ? $request->get('name') : $user->name
                ]);

                $user = User::where('id', '=', $user->id)->first();
            }

            $userResource = UserResource::make($user);

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
