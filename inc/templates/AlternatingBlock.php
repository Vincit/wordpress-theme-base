<?php
namespace Vincit\Template;

use \Vincit\Media;

function AlternatingBlock($data = []) {
  $data = params([
    "background" => [
      "image" => null,
      "color" => null,
      "position" => "top",
    ],
    "content" => [
      "main" => [
        "wysiwyg" => ["editor" => null],
        "vertical_alignment" => "top",
      ],
      "secondary" => [
        "type" => null,
        "shortcode" => null,
        "image" => null,
        "vertical_alignment" => "top",
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
      <div
        <?=className(
          "alternating-block__main",
          "align--" . v($data, "content.main.vertical_alignment")
        )?>
      >
        <?=v($data, "content.main.wysiwyg.editor")?>
      </div>

      <div
        <?=className(
          "alternating-block__secondary",
          "align--" . v($data, "content.secondary.vertical_alignment")
        )?>
      >
        <?=$isShortcode ? (
          do_shortcode(v($data, "content.secondary.shortcode"))
        ) : (
          wrapper(Media\image(
            v($data, "content.secondary.image", null),
            "large",
            false
          ))
        )?>
      </div>
    </div>
  </div> <?php
}
