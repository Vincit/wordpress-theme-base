<?php
namespace Vincit;

/* Running WP_DEBUG in production will get you into trouble. */
if (defined("WP_DEBUG") && WP_DEBUG) {
  $cors_headers = [
    "HTTP_X_PROXIEDBY_WEBPACK" => "true",
    "HTTP_ORIGIN" => "http://localhost:8080",
  ];

  foreach ($cors_headers as $key => $value) {
    if (!empty($_SERVER[$key]) && $_SERVER[$key] === $value) {
      error_log("Enabling CORS for request");
      header("Access-Control-Allow-Origin: *");
      break 1;
    }
  }
}
