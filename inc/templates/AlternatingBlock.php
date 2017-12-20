<?php
namespace Vincit\template;

function AlternatingBlock($data = []) {
  $data = params([
    "background" => [
      "image" => null,
      "color" => null,
      "position" => "top",
    ],
    "content" => [
      "main_wysiwyg" => [
        "editor" => null,
      ],
      "secondary" => [
        "type" => null,
        "shortcode" => null,
        "image" => null,
      ],
    ],
    "options" => [
      "inverse_order" => false,
      "color" => false,
    ],
  ], $data);

  $isShortcode = v($data, "content.secondary.type") === "shortcode";
  $bgColor = v($data, "options.color.value", false);
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
        v($data, "options.inverse_order") ? "reverse" : "normal",
        $isShortcode ? "shortcode" : "no-shortcode"
      )?>
    >
      <div class="alternating-block__main">
        <?=v($data, "content.main_wysiwyg.editor")?>
      </div>

      <div class="alternating-block__secondary">
        <?=$isShortcode ? (
          do_shortcode(v($data, "content.secondary.shortcode"))
        ) : (
          \Vincit\WP\Media\image(
            v($data, "content.secondary.image", null),
            "large",
            false
          )
        )?>
      </div>
    </div>
  </div> <?php
}
