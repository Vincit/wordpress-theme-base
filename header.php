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

  <?php
  $logo = function () {
    if (has_custom_logo()) {
      the_custom_logo();
    } else { ?>
      <a href="<?=home_url()?>" class="custom-logo-link custom-logo-unset" rel="home" itemprop="url">
        <img
          src="https://vincit.fi/wp-content/themes/vincit.com/images/Vincit_tirppa_white.png"
          class="custom-logo"
          alt="Wordpress2"
          itemprop="logo"
        >
      </a>
    <?php }
  };
  ?>

  <header class="site-header">
    <div class="container">
      <nav class="main-navigation">
      <?=$logo()?>
      <?=wp_nav_menu([
        // "container" => "nav",
        "theme_location" => "header-menu",
      ])?>
      </nav>
    </div>
  </header>

  <header class="mobile-header">
    <div class="header-bar">
      <div class="container">
        <button class="menu-toggle">
          <img class="open-icon" src="<?=get_stylesheet_directory_uri() . "/dist/img/svg/menu-2.svg"?>">
          <img class="close-icon" src="<?=get_stylesheet_directory_uri() . "/dist/img/svg/close.svg"?>">
          <span class="screen-reader-text">Menu</span>
        </button>

        <?=$logo()?>

        <button class="search-toggle">
          <img class="open-icon" src="<?=get_stylesheet_directory_uri() . "/dist/img/svg/search.svg"?>">
          <img class="close-icon" src="<?=get_stylesheet_directory_uri() . "/dist/img/svg/close.svg"?>">
          <span class="screen-reader-text">Menu</span>
        </button>
      </div>
    </div>

    <nav class="mobile-navigation">
      <?=wp_nav_menu([
        // "container" => "nav",
        "theme_location" => "header-menu",
      ])?>
    </nav>

    <form class="mobile-search search-form" action="/">
      <input type="search" name="s" placeholder="Search from site">
      <button type="submit">Search</button>
    </form>
  </header>

  <main id="content">
