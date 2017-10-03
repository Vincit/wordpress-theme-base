<?php
namespace Vincit;

add_action("init", function () {
  register_nav_menus([
    "header-menu" => "Header menu",
  ]);
});
