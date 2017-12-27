<?php
/**
 * Template Name: Pagebuilder
 *
 * @package WordPress
 */

get_header(); ?>

<div class="pagebuilder">
  <?=\Vincit\Pagebuilder::instance()->getLayout()?>
</div>

<?php get_footer();
