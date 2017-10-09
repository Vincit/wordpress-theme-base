<?php
namespace Vincit\WP\Taxonomy;

/**
 * Returns the "primary" term, which means the first that is in the list. Respects term order.
 *
 * @param string $taxonomy
 * @param mixed $post_id
 */
function get_primary_term($taxonomy = 'category', $post_id = null) {
  if (is_null($post_id)) {
    $post_id = get_the_ID();

    if (!$post_id) {
      return false;
    }
  }

  $terms = wp_get_object_terms([$post_id], [$taxonomy], ['orderby' => 'term_order']);
  if (!empty($terms)) {
    return $terms[0];
  } else {
    return false;
  }
}
