<?php
namespace Vincit\WP\Menus;

add_action("init", function () {
  register_nav_menus([
    "header-menu" => "Header menu",
  ]);
});
