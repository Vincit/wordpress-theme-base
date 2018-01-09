<?php
namespace Vincit\Template;

/**
 * Generic hero block with an optional CTA button
 *
 * @param array $data
 */
function Hero($data = []) {
  $data = params([
    "background" => [
      "image" => null,
      "position" => "top",
    ],
    "wysiwyg" => [
      "editor" => null,
    ],
    "button" => null,
  ], $data); ?>

  <div class="hero" style="
    background-image: url('<?=v($data, "background.image.url")?>');
    background-position: <?=v($data, "background.position")?>;
  ">
    <div class="container">
      <div class="noop-wrapper"> <!-- Makes life with flexbox easier -->
        <?=v($data, "wysiwyg.editor")?>
        <?=Button($data["button"])?>
      </div>
    </div>
  </div><?php
}
