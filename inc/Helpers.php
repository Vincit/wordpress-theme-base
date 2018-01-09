<?php
/**
 * Helpers that you don't want to "pollute" the root namespace with.
 */
namespace Vincit\Helpers;

/**
 * Dives into deep arrays using dot notation and returns a single value, or the default
 * if no value was found. Great for providing fallback or default values.
 *
 * dotty($authorData, "name", "John Doe")
 *
 * @param array $data
 * @param string $key
 * @param mixed $default
 */
function dotty($data = [], $key = "", $default = false) {
  if (!empty($data)) {
    if (strpos($key, ".") > -1) {
      $levels = explode(".", $key);
      $value = $data;

      for ($level = 0; $level < count($levels); $level++) {
        $value = $value[$levels[$level]] ?? $default;
      }

      if (is_array($value) && empty($value)) {
        return $default;
      }

      return $value;
    }

    return $data[$key] ?? $default;
  }

  return $default;
}
