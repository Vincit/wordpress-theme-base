<?php
namespace Vincit;

add_filter("mce_buttons_2", function($buttons) {
  array_unshift($buttons, "styleselect");
  return $buttons;
});

add_filter("tiny_mce_before_init", function($init_array) {
  $style_formats = array(
    [
      "title" => "Smaller text",
      "inline" => "small",
      "classes" => "smaller",
    ],
    [
      "title" => "Big paragraph",
      "classes" => "bigger",
      "block" => "p",
    ],
  );
  $init_array["style_formats"] = json_encode($style_formats);
  return $init_array;
});
