<?php
namespace Vincit;

/**
 * Strip empty paragraphs
 *
 * @param mixed $content
 */
function strip_empty_paragraphs($content) {
  return str_replace("<p>&nbsp;</p>", "", $content);
}

add_filter("the_content", "\\Vincit\\strip_empty_paragraphs");
