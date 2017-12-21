<?php
namespace Vincit\Template;

/**
 * Is actually a link, but looks like a button.
 *
 * @param mixed $data
 */
function SampleWidgets($data = []) {
  $data = params([
    "react" => false,
    "vanilla" => false,
  ], $data); ?>

  <div class="sample-widgets">
    <div class="container">
      <?php if ($data["react"]) { ?>
      <div class="react"></div>
      <?php } ?>

      <?php if ($data["vanilla"]) { ?>
      <div class="vanilla"></div>
      <?php } ?>
    </div>
  </div><?php
}
