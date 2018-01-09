<?php
/**
 * Register and tweak menus here.
 */
namespace Vincit\Menus;

add_action("init", function () {
  register_nav_menus([
    "header-menu" => "Header menu",
  ]);
});

/*
 * Add stages to menus so if it's required for something it's there.
 */
$menu_lookup = [];
add_filter("nav_menu_css_class", function ($classes, $item) use (&$menu_lookup) {
  $menu_lookup[$item->ID] = [
    "parent" => $item->menu_item_parent,
    "level" => $item->menu_item_parent !== '0' // Why is it a string?
      ? $menu_lookup[(int) $item->menu_item_parent]["level"] + 1
      : 0
  ];

  $classes[] = "level-{$menu_lookup[$item->ID]["level"]}";
  return $classes;
}, 999999, 2); // We want that the class is the last one.
