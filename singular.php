<?php get_header(); ?>

<div class="singular">
  <?php
  $builder = \Vincit\Pagebuilder::instance();

  while (have_posts()) { the_post();
    echo $builder->block("SinglePost", [
      "title" => get_the_title(),
      "content" => get_the_content(),
      "image" => get_post_thumbnail_id(),
    ]);?>

    <div class="container">
      <?=$builder->block("CommentList", [
        "post_id" => get_the_ID(),
      ])?>
    </div><?php
  } ?>
</div>

<?php get_footer();
