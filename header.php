<!doctype html>
<html>
  <head>
    <!--
    "Not all mobile browsers handle orientation changes in the same way.
    For example, Mobile Safari often just zooms the page when changing
    from portrait to landscape, instead of laying out the page as it
    would if originally loaded in landscape. If web developers want their
    scale settings to remain consistent when switching orientations on the
    iPhone, they must add a maximum-scale value to prevent this zooming,
    which has the sometimes-unwanted side effect of preventing users from zooming in."
    https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag#Viewport_width_and_screen_width
    Users can enable zoom in browser settings if they want.
    -->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php wp_head(); ?>
  </head>
  <?php
  global $is_anon_user;
  $is_anon_user = !is_user_logged_in();
  ?>
  <body <?php body_class([
    !$is_anon_user ? 'user-logged-in' : 'user-not-logged-in',
  ]);?>>

  <a class="skip-link screen-reader-text" href="#content">
    Skip to content
  </a>

  <main id="content">
