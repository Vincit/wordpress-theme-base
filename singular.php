<?php get_header(); ?>

<div class="container">
  <?php
  $builder = new \Vincit\Pagebuilder();
  while (have_posts()) { the_post();
    echo $builder->block("SingleArticle", [
      "title" => apply_filters("the_title", get_the_title()),
      "content" => apply_filters("the_content", get_the_content()),
    ]);

    echo $builder->block("CommentList", [
      "post_id" => get_the_ID(),
    ]);
  } ?>
</div>

<?php get_footer();
