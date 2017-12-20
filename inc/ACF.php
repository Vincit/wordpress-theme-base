<?php
namespace Vincit\ACF;

$colorsJSON = json_decode(
  file_get_contents(get_template_directory() . "/src/colors.json")
);
$sharedColors = array_keys((array) $colorsJSON);

$colors = [];
foreach ($sharedColors as $color) {
  $colors[$color] = ucfirst(str_replace("-", " ", $color));
}

// Populate color field with values from shared-variables.json
add_filter("acf/load_field/key=field_5a39209c450d6", function ($field) use ($colors) {
  $field["instructions"] = ""; // Remove the default message
  $field["sub_fields"][0]["choices"] = $colors;
  $field["sub_fields"][0]["default_value"] = "gray";

  return $field;
}, 10);


// We rarely want all colors to be available as button colors, filter some out
add_filter("acf/load_field/key=field_5a3a18ca12b32", function ($field) use ($colors) {
  // If you add a field before color, this'll break

  $field["sub_fields"][2]["sub_fields"][0]["choices"] = array_diff(
    $colors,
    [
      "black" => "Black",
    ]
  );
  $field["sub_fields"][2]["sub_fields"][0]["default_value"] = "purple";

  return $field;
}, 11);
