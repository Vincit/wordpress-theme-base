<?php
namespace Vincit\GenericFilters;

function title_prefix($title) {
  $dev = "D";
  $production = "P";
  $staging = "S";

  if (\Vincit\is_prod() && is_user_logged_in()) {
    return "[$production] $title";
  } else if (\Vincit\is_dev()) {
    return "[$dev] $title";
  } elseif (!empty($_COOKIE["seravo_shadow"]) || \Vincit\is_staging()) {
    return "[$staging] $title";
  }

  // If both fail, fallback into this.
  $domains = [
    ".dev" => $dev,
    ".local" => $dev,
    "localhost" => $dev,
    ".seravo" => $production,
    ".wp-palvelu" => $production,
    get_site_url() => $production,
  ];

  foreach ($domains as $domain => $tag) {
    if (strpos(\Vincit\current_url(), $domain) > -1) {
      if ($tag === $production) {
        if (!is_user_logged_in()) {
          return $title;
        }
      }
      return "[$tag] $title";
    }
  }
  return $title;
}

add_filter("the_seo_framework_pro_add_title", "\\Vincit\\GenericFilters\\title_prefix");
add_filter("admin_title", "\\Vincit\\GenericFilters\\title_prefix");
add_filter("wp_title", "\\Vincit\\GenericFilters\\title_prefix");

/**
 * Strip empty paragraphs
 *
 * @param mixed $content
 */
function strip_empty_paragraphs($content) {
  return str_replace("<p>&nbsp;</p>", "", $content);
}

add_filter("the_content", "\\Vincit\\GenericFilters\\strip_empty_paragraphs");


// Gravity Forms makes some absolutely mental decisions.
// Loading scripts in head? Not on my watch.
add_filter("gform_tabindex", "\\__return_false");
add_filter("gform_init_scripts_footer", "\\__return_true");

add_filter("gform_cdata_open", function () {
  return "document.addEventListener('DOMContentLoaded', function() { ";
});

add_filter("gform_cdata_close", function () {
  return "}, false);";
});

// Disable "traffic lights"
add_filter("the_seo_framework_show_seo_column", "__return_false");

// Add %home% tag to bcn breadcrumbs
add_filter("bcn_template_tags", function ($replacements, $type, $id) {
  // d(...func_get_args());
  $replacements["%home%"] = gs("Breadcrumb: Home");

  return $replacements;
}, 3, 10);

/*
 * Add stages to menus so if it's required for something it's there.
 */
$menu_lookup = [];
add_filter("nav_menu_css_class", function ($classes, $item) use (&$menu_lookup) {
  $menu_lookup[$item->ID] = [
    "parent" => $item->menu_item_parent,
    "level" => $item->menu_item_parent !== '0' // Why is it a string?
      ? $menu_lookup[(int) $item->menu_item_parent]["level"] + 1
      : 0
  ];

  $classes[] = "level-{$menu_lookup[$item->ID]["level"]}";
  return $classes;
}, 999999, 2); // We want that the class is the last one.
