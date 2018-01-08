<?php
/*
 * Heavily "inspired" by aucor/aucor-starter localization
 */

namespace Vincit\Polylang {

  function strings() {
    return [
      "Breadcrumb: Home" => "Home",

      "Menu: Close" => "Close",

      "Pagination: First" => "First",
      "Pagination: Last" => "Last",
      "Pagination: Next" => "Next",
      "Pagination: Previous" => "Previous",

      "Button: Read more" => "Read more",
      "Button: Back" => "Back",

      "Share: Follow us" => "Follow us",
      "Share: CTA" => "Share",
      "Share: Share on [some]" => "Share on",

      "Sidebar: Archive" => "Archive",
      "Sidebar: Categories" => "Categories",
      "Sidebar: Tags" => "Tags",

      "Widget: Related posts" => "Related posts",
    ];
  }

  if (function_exists("pll_register_string") && is_admin()) {
    $strings = strings();

    foreach ($strings as $key => $value) {
      pll_register_string($key, $value, "theme", strlen($value) > 60);
    }

    $strings = get_field("translations", "options");
    foreach ($strings as $string) {
      pll_register_string($string["key"], $string["string"], $string["multiline"]);
    }
  }

}

namespace {

  function gs($key, $lang = null) {
    $strings = \Vincit\Polylang\strings();

    if (isset($strings[$key])) {
      if ($lang === null) {
        return pll__($strings[$key]);
      } else {
        return pll_translate_string($strings[$key], $lang);
      }
    }

    // debug missing strings
    if (WP_DEBUG === true) {
      // init warning to get source
      $e = new Exception('Localization error - Missing string by key {' . $key . '}');

      // find file and line for problem
      $trace_line ='';
      foreach ($e->getTrace() as $trace) {
        if (in_array($trace['function'], array('gs', 'gs'))) {
          $trace_line = ' in ' . $trace['file'] . ':' . $trace['line'];
        }
      }

      // compose error message
      $error_msg = $e->getMessage() . $trace_line . ' ==> add it to /inc/localization.php';

      // trigger_error($error_msg , E_USER_WARNING);
      error_log($error_msg);
    }

    return $key;
  }

  if (!function_exists("pll__")) {
    function pll__($s) {
      return $s;
    }

    function pll_e($s) {
      echo $s;
    }

    function pll_current_language() {
      return "fi";
    }

    function pll_get_post_language($id) {
      return "fi";
    }

    function pll_get_post($post_id, $slug = "") {
      return $post_id;
    }

    function pll_get_term($term_id, $slug = "") {
      return $term_id;
    }

    function pll_translate_string($str, $lang = "") {
      return $str;
    }

    function pll_home_url($slug = "") {
      return get_home_url();
    }
  }

}
