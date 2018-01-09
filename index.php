<?php
/**
 * The index page. The last file WordPress will try to load when resolving template.
 * See http://wphierarchy.com for help.
 */
namespace Vincit;

get_header(); ?>

<div class="container">
  <?php
  $builder = \Vincit\Pagebuilder::instance();

  echo $builder->block("PostList");
  echo $builder->block("Pagination") ?>
</div>

<?php get_footer();
