<?php

namespace App\Utils;

use App\Enums\ResponseCodeEnum;

class AppHelper
{
  static function sendResponse(
    string $message = 'Request Completed!',
    mixed $result = null,
    mixed $errors = null,
    int $status = 200,
    ResponseCodeEnum $code = ResponseCodeEnum::serverError,
    bool $success = true
  ) {
    return response()->json([
      'message' => $message,
      'result' => $result,
      'errors' => $errors,
      'status' => $status,
      'code' => $code->value,
      'success' => $success
    ]);
  }

  static function sendRequestFailedResponse(string $message = 'Request Failed, Something Went Wrong :/', mixed $errors = null, int $status = 500, ResponseCodeEnum $code = ResponseCodeEnum::serverError)
  {
    return AppHelper::sendResponse($message, null, $errors, $status, $code, false);
  }

  static function sendNotFoundResponse(mixed $errors = null, string $message = 'Not Found!')
  {
    return AppHelper::sendRequestFailedResponse($message, $errors, 404, ResponseCodeEnum::notFound);
  }

  static function sendBadRequestResponse(mixed $errors = null, string $message = 'Bad Request!')
  {
    return AppHelper::sendRequestFailedResponse($message, $errors, 400, ResponseCodeEnum::badRequest);
  }

  static function sendSuccessResponse(mixed $result = null, string $message = 'Request Completed Successfully!', int $status = 200)
  {
    return AppHelper::sendResponse($message, $result, null, $status, ResponseCodeEnum::success, true);
  }
}
