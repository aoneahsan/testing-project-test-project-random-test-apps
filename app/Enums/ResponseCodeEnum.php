<?php

namespace App\Enums;

enum ResponseCodeEnum: string
{
  case notFound = 'notFound';
  case badRequest = 'badRequest';
  case serverError = 'serverError';
  case success = 'success';
  case itemExists = 'itemExists';
}
