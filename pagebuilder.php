<?php
/**
 * Template Name: Pagebuilder
 *
 * @package WordPress
 */

get_header(); ?>

<div class="pagebuilder">
  <?=(new \Vincit\Pagebuilder())->getLayout()?>
</div>

<?php get_footer();
