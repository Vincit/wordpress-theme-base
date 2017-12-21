<?php get_header(); ?>

<div class="container">
  <?php
  $builder = \Vincit\Pagebuilder::instance();

  echo $builder->block("PostList");
  echo $builder->block("Pagination") ?>
</div>

<?php get_footer();
