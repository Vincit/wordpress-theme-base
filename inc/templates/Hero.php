<?php
namespace Vincit\template;

function Hero($data = []) { ?>
  <div class="hero" style="background-image: url('<?=$data["background"]["url"]?>')">
    <div class="container">
      <div class="noop-wrapper"> <!-- Makes life with flexbox easier -->
        <?=$data["content"]?>
      </div>
    </div>
  </div><?php
}
