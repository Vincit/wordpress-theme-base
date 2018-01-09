<?php
namespace Vincit\Template;

use \Vincit\Options;
use \Vincit\Media;

/**
 * Prints share buttons if they're configured on the options pages.
 *
 * @param array $data
 */
function SomeButtons($data = []) {
  $data = params([
    "medias" => Options\get("social_media_channels"),
  ]);

  $data["medias"] = array_filter($data["medias"], function ($media) {
    return !empty($media["share_button"]);
  });

  if (empty($data["medias"])) {
    return false;
  } ?>

  <div class="some-buttons">
    <h3><?=gs("Some: Share")?></h3>

    <?php
    foreach ($data["medias"] as $media) {
      $name = $media["media"];
      $lcName = strtolower($name);
      $title = sprintf(gs("Some: Share on %s"), $name);
      $link = str_replace(
        ["%url%", "%title%"],
        [get_permalink(), get_the_title()],
        $media["share_link"]
      )?>

      <a href="<?=$link?>" class="<?=$lcName?>" title="<?=$title?>" target="_blank" rel="noreferrer noopener">
        <?=Media\svg("$lcName.svg")?>
        <span class="screen-reader-text">
          <?=$name?>
        </span>
      </a>
    <?php } ?>
  </div><?php
}
