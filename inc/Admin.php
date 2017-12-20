<?php
namespace Vincit\Admin;

if (is_admin()) {
  class_alias('\GlobalMetaBoxOrder\Config', 'MetaBoxConfig');

  \MetaBoxConfig::$getBlueprintUserId = function () {
    return 2;
  };

  // Admin user sets the post count and visible columns, user can't configure them
  \MetaBoxConfig::$remove_screen_options = true;

  // Same with metaboxes.
  \MetaBoxConfig::$lock_meta_box_order = true;
}
