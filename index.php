<?php get_header(); ?>

<div class="container">
  <?php
  $builder = new \Vincit\Pagebuilder();

  echo $builder->block("PostList");
  echo $builder->block("Pagination") ?>
</div>

<?php get_footer();
