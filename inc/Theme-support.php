<?php
namespace Vincit;

add_action("after_setup_theme", function() {
  add_theme_support("custom-logo");
  add_theme_support("post-thumbnails");
  add_theme_support("title-tag");
  add_theme_support("html", [
    "search-form",
    "comment-list",
    "gallery",
    "caption",
    // "comment-form" // until someone makes the hard coded novalidate attr filterable this stays off.
  ]);

  $GLOBALS["content_width"] = 800; // Width of the actual content in single page.
  add_theme_support("soil-clean-up");
  add_theme_support("soil-disable-trackbacks");
  add_theme_support("soil-nav-walker");
  add_theme_support("soil-nice-search");
  add_theme_support("soil-disable-asset-versioning");
});
