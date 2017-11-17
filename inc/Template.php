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
