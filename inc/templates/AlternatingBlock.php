<?php
namespace Vincit\template;

function AlternatingBlock($data = []) {
  $data = params([
    "inverse_order" => false,
    "content" => "",
    "secondary_content" => [
      "embed_a_shortcode" => false,
      "shortcode" => null,
      "image" => null,
    ],
    "background" => [
      "image" => null,
      "color" => null
    ]
  ], $data);

  $bgColor = v($data, "background.color", false);
  $bgClass = $bgColor ? "bg--$bgColor" : ""; ?>

  <div
    <?=className(
      "alternating-block",
      $bgClass
    )?>
    style="
      background-image: url('<?=v($data, "background.image.url", false)?>')
    "
  >
    <div
      <?=className(
        "container",
        $data["inverse_order"] ? "reverse" : "normal",
        v($data, "secondary_content.embed_a_shortcode") ? (
            "shortcode"
          ) : (
            "no-shortcode"
          )
      )?>
    >
      <div class="alternating-block__main">
        <?=$data["content"]?>
      </div>

      <div class="alternating-block__secondary">
        <?=v($data, "secondary_content.embed_a_shortcode") ? (
          do_shortcode($data["secondary_content"]["shortcode"])
        ) : (
          \Vincit\WP\Media\image(
            v($data, "secondary_content.image", null),
            "large",
            false
          )
        )?>
      </div>
    </div>
  </div> <?php
}
