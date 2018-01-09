<?php
namespace Vincit\Template;

/**
 * Renders the sample widgets.
 *
 * @param array $data
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
