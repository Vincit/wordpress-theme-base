<?php
namespace Vincit\Assets;

define("THEMEROOT", get_stylesheet_directory());
define("CLIENT_MANIFEST", (array) json_decode(file_get_contents(THEMEROOT . "/dist/client-manifest.json")));
define("ADMIN_MANIFEST", (array) json_decode(file_get_contents(THEMEROOT . "/dist/admin-manifest.json")));
define("IS_WDS", !empty($_SERVER["HTTP_X_PROXIEDBY_WEBPACK"]) && $_SERVER["HTTP_X_PROXIEDBY_WEBPACK"] === 'true');

function asset_path($asset, $ignore_existence = false) {
  $path = get_stylesheet_directory_uri() . "/dist/";
  $notInClient = empty(CLIENT_MANIFEST[$asset]);
  $notInAdmin = empty(ADMIN_MANIFEST[$asset]);

  if ($notInClient && $notInAdmin) {
    throw new \Exception("Asset wasn't found in any manifest.");
    return false;
  }

  if (!$notInClient) {
    return $path . CLIENT_MANIFEST[$asset];
  }

  if (!$notInAdmin) {
    return $path . ADMIN_MANIFEST[$asset];
  }

  throw new \Exception("This code should've returned already. Bug.");
};

function enqueue_parts($path = null, $deps = []) {
  if (is_null($path)) {
    trigger_error('Enqueue path must not be empty', E_USER_ERROR);
  }

  $parts = explode(".", basename($path));
  $type = array_reverse($parts)[0];
  $handle = basename($parts[0]) . "-" . $type;

  // Some externals won't have filetype in the URL, so do manual override.
  if (strpos($path, "fonts.googleapis") > -1) {
    $type = "css";
    $handle = "fonts";
  } else if (strpos($path, "polyfill.io") > -1) {
    $type = "js";
    $handle = "polyfill";
  }

  return [
    "parts" => $parts,
    "type" => $type,
    "handle" => $handle,
    "file" => $path,
  ];
}

/**
 * Better enqueue function. Less verbose to use.
 * Based on \rnb\core\enqueue (https://github.com/redandbluefi/wordpress-tools/blob/master/modules/core.php#L118)
 *
 * @param string $path
 * @param array $deps
 * @param boolean $external
 */

function enqueue($path = null, $deps = []) {
  if (!$path) {
    return false;
  }

  $parts = enqueue_parts($path, $deps);
  $type = $parts["type"];
  $handle = $parts["handle"];
  $file = $parts["file"];

  switch ($type) {
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
  // Webfonts:
  // enqueue("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700", [], true);

  // Own polyfills supplied instead
  // enqueue("https://cdn.polyfill.io/v2/polyfill.min.js?features=default,es6,fetch", [], true);

  // Used to determine what to cache for offline use and so on.
  // In reality Webpack Offline Plugin handles it, but these serve as samples,
  // and may help you build things.
  \wp_localize_script("client-js", "theme", [
    "path" => get_stylesheet_directory_uri(),
    "cache" => [
      "stylesheet" => IS_WDS ? false : enqueue(asset_path("client.css")),
      "javascript" => enqueue(asset_path("client.js"), ["wplf-form-js"]),
    ],
    "siteurl" => get_site_url(),
    "lang" => pll_current_language(),
  ]);
}

function admin_assets() {
  \wp_localize_script("admin-js", "theme", [
    "path" => get_stylesheet_directory_uri(),
    "cache" => [
      "stylesheet" => enqueue(asset_path("admin.css")),
      "javascript" => enqueue(asset_path("admin.js")),
    ],
    "siteurl" => get_site_url(),
    "lang" => pll_current_language(),
  ]);
}

function editor_assets() {
  $file = ADMIN_MANIFEST["editor.css"];
  add_editor_style("dist/$file");
}

\add_action("wp_enqueue_scripts", "\\Vincit\\Assets\\theme_assets");
\add_action("admin_enqueue_scripts", "\\Vincit\\Assets\\admin_assets");
\add_action("login_enqueue_scripts", "\\Vincit\\Assets\\admin_assets");

if (is_admin()) {
  editor_assets();
}
