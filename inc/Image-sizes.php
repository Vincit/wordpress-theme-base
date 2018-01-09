<?php
/**
 * Add new image sizes and edit the default ones.
 */
namespace Vincit\ImageSizes;

add_action("after_setup_theme", function () {
 // add_image_size
});

// The srcset provided by WP is... weird.
add_filter("wp_calculate_image_sizes", function ($sizes) {
  if (strpos($sizes, $GLOBALS["content_width"]) > -1) {
    return ""; // disable if large
  }

  return $sizes;
});

add_action("admin_init", function () {
  // Default media settings are insane in 2018.
  $image_sizes = [
    [
      "name" => "thumbnail",
      "w" => 450,
      "h" => 450,
    ],
    [
      "name" => "medium",
      "w" => 1600,
      "h" => 900,
    ],
    [
      "name" => "large",
      "w" => 2560,
      "h" => 1440,
    ]
  ];

  foreach ($image_sizes as $size) {
    $existing_w = intval(get_option($size["name"] . "_size_w"));
    $existing_h = intval(get_option($size["name"] . "_size_h"));

    var_dump($existing_w);
    var_dump($size);

    if ($existing_w !== $size["w"]) {
      update_option($size["name"] . "_size_h", $size["h"]);
      update_option($size["name"] . "_size_w", $size["w"]);
    } else {
      break;
    }
  }

  update_option("image_default_align", "none");
  update_option("image_default_link_type", "none");
  update_option("image_default_size", "full");
});
