<?php
namespace Vincit\Admin;

if (is_admin()) {
  if (class_exists("GlobalMetaBoxOrder\\Config")) {
    class_alias('\GlobalMetaBoxOrder\Config', 'MetaBoxConfig');

    \MetaBoxConfig::$getBlueprintUserId = function () {
      return 2;
    };

    // Admin user sets the post count and visible columns, user can't configure them
    \MetaBoxConfig::$remove_screen_options = true;

    // Same with metaboxes.
    \MetaBoxConfig::$lock_meta_box_order = true;
  }
}

// Users who will edit navigations will wonder where are the options
// if this doesn't exist.
add_action("user_register", function ($user_id) {
  update_user_option($user_id, "metaboxhidden_nav-menus", [

  ]); // No hidden metaboxes. Show them all.
}, 10);
