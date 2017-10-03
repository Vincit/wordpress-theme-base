<?php
namespace Vincit;

/**
 * WP wraps images and other things in paragraph tags. That makes certain layouts impossible to pull off.
 *
 * @param mixed $content
 */
function unwrap_inline_images($content) {
  return preg_replace("/<p>\\s*?(<a .*?><img.*?><\\/a>|<img.*?>)?\\s*<\\/p>/s", "\1", $content);
}

// add_filter("the_content", "\\Vincit\\unwrap_inline_images"); // broken!

/**
 * Remove inline width attribute from element such as figure
 *
 * @param string $content
 */
function remove_inline_width($content) {
  preg_match("/<[^>]*style=.(width:.\d{0,}.{0,}?[^\"\"]*)/", $content, $matches); // this could be probably done with preg_replace

  for ($i = 1; $i < count($matches); $i++) {
    $content = str_replace($matches[$i], "", $content);
  }

  return $content;
}

add_filter("the_content", "\\Vincit\\remove_inline_width");

/**
 * Strip empty paragraphs
 *
 * @param mixed $content
 */
function strip_empty_paragraphs($content) {
  return str_replace("<p>&nbsp;</p>", "", $content);
}

add_filter("the_content", "\\Vincit\\strip_empty_paragraphs");
