<?php
namespace Vincit\Template;

/**
 * Is actually a link, but looks like a button.
 *
 * @param mixed $data
 */
function Button($data = []) {
  $data = params([
    "text" => null,
    "link" => null,
    "color" => [
      "value" => "white",
    ],
  ], $data);

  if (empty($data["text"]) || empty($data["link"])) {
    // Default is null, but ACF may populate this with empty string
    return false;
  } ?>

  <a <?=className("button", "bg--{$data["color"]["value"]}")?> href="<?=$data["link"]?>">
    <?=$data["text"]?>
  </a><?php
}
