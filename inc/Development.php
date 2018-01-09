<?php
/**
 * Settings and functions related to development. May be dangerous
 * in production, never run WP_DEBUG on a production site with live visitors.
 */
namespace Vincit\Development {

  /* Running WP_DEBUG in production will get you into trouble. */
  if (defined("WP_DEBUG") &&  \WP_DEBUG) {
    $cors_headers = [
      "HTTP_X_PROXIEDBY_WEBPACK" => "true",
      "HTTP_ORIGIN" => "http://localhost:8080",
    ];

    foreach ($cors_headers as $key => $value) {
      if (!empty($_SERVER[$key]) && $_SERVER[$key] === $value) {
        header("Access-Control-Allow-Origin: *");
        break 1;
      }
    }
  }

  /**
   * Outputs all parameters given to the function a readable format.
   * Works with Flexbox, unlike var_dump when XDebug is enabled.
   */
  function dump() {
    $args = func_get_args();
    $styles = "padding: 15px; background: #fbfbfb; overflow-x: scroll; max-width: 100%";
    echo "<pre style='$styles'>";
    foreach ($args as $i => $arg) {
      print_r($arg);
      if ($i + 1 !== count($args)) {
        echo "\n<hr>\n";
      }
    }
    echo "</pre>";
  }

}

namespace {

  if (!function_exists("d")) {
    function d() {
      return \Vincit\Development\dump(...func_get_args());
    }
  }

}
