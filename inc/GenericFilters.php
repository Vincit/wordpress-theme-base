<?php
/**
 * Generic filters when there's no better place to put them
 * and you're too lazy to create a new one..
 */
namespace Vincit\GenericFilters;

function title_prefix($title) {
  $dev = "D";
  $staging = "S";

  if (\Vincit\is_prod() && is_user_logged_in()) {
    return $title;
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

// Disable "traffic lights"
add_filter("the_seo_framework_show_seo_column", "__return_false");

// Add %home% tag to bcn breadcrumbs
add_filter("bcn_template_tags", function ($replacements, $type, $id) {
  // d(...func_get_args());
  $replacements["%home%"] = gs("Breadcrumb: Home");

  return $replacements;
}, 3, 10);

/**
 * OG tag image urls must be absolute
 *
*/
add_filter('the_seo_framework_ogimage_output', function ($image) {
  return esc_url(home_url($image));
}, 10, 2);

add_filter('the_seo_framework_twitterimage_output', function ($image) {
  return esc_url(home_url($image));
}, 10, 2);
