<?php
/**
 * Handy functions under the template namespace for easy use.
 */

namespace Vincit\template;

/**
 * Shorthand for dotty helper.
 *
 */
function v() {
  return \Vincit\Helpers\dotty(...func_get_args());
}


/**
 * Combines default parameters with provided parameters
 *
 * @param array $defaults
 * @param array $provided
 * @return array
 */
function params($defaults = [], $provided = []) {
  return array_replace_recursive($defaults, array_filter($provided, function ($value) {
    if (is_bool($value)) {
      return true; // empty() fails on booleans
    }

    return !empty($value);
  }));
}

/**
 * For component class names. Produces more readable code and end result.
 *
 */
function className() {
  $args = func_get_args();
  $classes = PHP_EOL . join(PHP_EOL, $args);

  return "class=\"$classes\"";
}
