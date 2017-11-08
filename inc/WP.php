<?php
namespace Vincit\WP;

/* Helpers for WP. Based on redandblue/wordpress-tools. */

/**
 * Returns current env, defaulting to production if none is set.
 *
 * @return string
 */
function env() {
  if (defined('WP_ENV')) {
    return WP_ENV;
  } else {
    define('WP_ENV', getenv('WP_ENV') ?? 'production');
  }
  return WP_ENV;
}

/**
 * Return whether env is production or not.
 *
 * @return boolean
 */
function is_prod() {
  return env() === 'production';
}

/**
 * Return whether env is staging or not.
 *
 * @return boolean
 */
function is_staging() {
  return env() === 'staging';
}

/**
 * Return whether env is development or not.
 *
 * @return boolean
 */
function is_dev() {
  return env() === 'development';
}

/**
 * Return the current, full URL.
 * 21 years of PHP and still no function on server variable capable of doing this.
 *
 * @return string
 */
function current_url() {
  $protocol = (isset($_SERVER['HTTPS']) ? "https" : "http");
  return "$protocol://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}

/**
 * Return string in slugish format.
 *
 * @param string $string
 * @return string
 */
function slugify($string = '') {
  $string = str_replace(' ', '-', $string);
  $string = strtolower($string);
  return preg_replace('/[^A-Za-z0-9\-]/', '', $string);
}

/**
 * Concats strings and arrays into one string. Useful for tags.
 *
 * @param mixed $parts
 * @param string $glue
 *
 * @return string
 */
function tag($parts = [], $glue = "\n") {
  foreach ($parts as $key => $part) {
    if (!is_array($part)) {
      $parts[$key] = [$part];
    }
  }

  $html = "";
  $it = new \RecursiveIteratorIterator(new \RecursiveArrayIterator($parts));

  foreach ($it as $key => $part) {
    $html .= $part . $glue;
  }

  return $html;
}

foreach (glob(dirname(__FILE__) . "/WP/*") as $filename) {
  require_once($filename);
}
