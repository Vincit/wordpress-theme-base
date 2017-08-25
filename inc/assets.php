<?php
namespace Vincit;

define('ENQUEUE_STRIP_PATH', '/data/wordpress/htdocs');

/**
 * Better enqueue function. Deals with hashes in filenames and is less verbose to use.
 * Based on \rnb\core\enqueue (https://github.com/redandbluefi/wordpress-tools/blob/master/modules/core.php#L118)
 *
 * @param string $path
 * @param array $deps
 * @param boolean $external
 */

function enqueue($path = null, $deps = [], $external = false) {
  if (is_null($path)) {
    trigger_error('Enqueue path must not be empty', E_USER_ERROR);
  } else if (!defined('ENQUEUE_STRIP_PATH')) {
    trigger_error('You must define ENQUEUE_STRIP_PATH, 99% of the time it\'s /data/wordpress/htdocs', E_USER_ERROR);
  }

  if ($external) {
    $file = $path;
  } else {
    $files = glob($path, GLOB_MARK);
    $unhashed = str_replace("*.", "", $path);

    if (file_exists($unhashed)) {
      $files[] = $unhashed;
    }

    usort($files, function($a, $b) {
      return filemtime($b) - filemtime($a);
    });

    $file = $files[0];
  }

  $parts = explode(".", $file);
  $type = array_reverse($parts)[0];
  $handle = basename($parts[0]) . "-" . $type;
  $file = str_replace(ENQUEUE_STRIP_PATH, "", $file);

  // Some externals won't have filetype in the URL, manual override.
  if (strpos($path, "fonts.googleapis") > -1) {
    $type = "css";
    $handle = "fonts";
  } else if (strpos($path, "polyfill.io") > -1) {
    $type = "js";
    $handle = "polyfill";
  }

  switch($type) {
    case "js":
      \wp_enqueue_script($handle, $file, $deps, false, true);
    break;
    case "css":
      \wp_enqueue_style($handle, $file, $deps, false, 'all');
      break;
    default:
      throw new \Exception('Enqueued file must be a css or js file.');
  }

  return $file;
}

function theme_assets() {
  $themeroot = get_stylesheet_directory();

  // Webfonts:
  // enqueue("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700", [], true);

  enqueue("https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,fetch", [], true);

  // Used to determine what to cache for offline use and so on.
  \wp_localize_script("client-js", "theme", [
    "directory" => str_replace(ENQUEUE_STRIP_PATH, "", $themeroot),
    "cache" => [
      "stylesheet" => enqueue("$themeroot/dist/client.*.css"),
      "javascript" => enqueue("$themeroot/dist/client.*.js"),
    ],
  ]);
}

function admin_assets() {
  $themeroot = get_stylesheet_directory();

  // Styles:
  enqueue("$themeroot/dist/admin.*.css");

  // Scripts:
  enqueue("$themeroot/dist/admin.*.js");
}

function editor_assets() {

}

\add_action("wp_enqueue_scripts", "\Vincit\\theme_assets");
\add_action("admin_enqueue_scripts", "\Vincit\theme_assets");
// \add_action("editor_scripts", "\Vincit\theme_assets"); // Figure it out.
