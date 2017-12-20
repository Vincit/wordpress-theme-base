<?php
namespace Vincit\WP\Theme;

add_action("after_setup_theme", function () {
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


  add_filter("wp_calculate_image_sizes", function ($sizes) {
    if (strpos($sizes, $GLOBALS["content_width"]) > -1) {
      return ""; // disable if large
    }

    return $sizes;
  });
});

function configure_relevanssi($force = false) {
  if ($force || !get_option("vincit_relevanssi_configured")) {
    /* Legend
       *: Comma separated list of IDs.
    */
    $opts = [
      "title_boost" => 5,
      "comment_boost" => 0.75,
      "admin_search" => "on",
      "highlight" => "class",
      "txt_col" => "#ff0000",
      "bg_col" => "#ffaf75",
      "css" => "text-decoration: underline; text-color: #ff0000",
      "class" => "relevanssi-query-term",
      "excerpts" => "on",
      "excerpt_length" => 30,
      "excerpt_type words" => "",
      "excerpt_allowable_tags" => "<p><a><strong><em>",
      "log_queries" => "off",
      "log_queries_with_ip" => "off",
      "cat" => 0, // *
      "excat" => 0, // *
      "extag" => 0, // *
      "index_fields" => "visible",
      "exclude_posts" => "",
      "hilite_title" => "off",
      "highlight_docs" => "off",
      "highlight_comments" => "off",
      "index_comments" => "none",
      "show_matches" => "on",
      "show_matches_text" => "<!--
Search hits:
  %body% in body,
  %title% in title,
  %categories% in categories,
  %tags% in tags,
  %taxonomies% in other taxonomies,
  %comments% in comments.
Score: %score%
-->
",
      "fuzzy" => "sometimes",
      "expand_shortcodes" => "on",
      "index_author" => "off",
      "implicit_operator" => "AND",
      "omit_from_logs" => "",
      "synonyms" => "",
      "index_excerpt" => "off",
      "index_limit" => 500,
      "disable_or_fallback" => "off",
      "respect_exclude" => "on",
      "min_word_length" => 3,
      "wpml_only_current" => "on",
      "word_boundaries" => "on",
      "default_orderby" => "relevance",
      "throttle" => "on",
      "throttle_limit" => 500,
    ];

    foreach ($opts as $key => $value) {
      \update_option("relevanssi_$key", $value);
    }

    \update_option("vincit_relevanssi_configured", time());
  }
} configure_relevanssi(true);
