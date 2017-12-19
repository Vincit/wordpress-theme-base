<?php
namespace Vincit\template;

function Hero($data = []) {
  $data = params([
    "background" => [
      "image" => null,
      "position" => "top",
    ],
    "wysiwyg" => [
      "editor" => null,
    ],
  ], $data); ?>
  <div class="hero" style="
    background-image: url('<?=v($data, "background.image.url")?>');
    background-position: <?=v($data, "background.position")?>;
  ">
    <div class="container">
      <div class="noop-wrapper"> <!-- Makes life with flexbox easier -->
        <?=v($data, "wysiwyg.editor")?>
      </div>
    </div>
  </div><?php
}
