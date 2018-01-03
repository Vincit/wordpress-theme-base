<?php get_header(); ?>

<div class="container frontpage">
  <?php
  $builder = \Vincit\Pagebuilder::instance();

  while (have_posts()) { the_post();
    echo $builder->block("SinglePost", [
      "title" => get_the_title(),
      "content" => get_the_content(),
      "image" => get_post_thumbnail_id(),
    ]);
  } ?>
</div>

<?=$builder->block("SampleWidgets", [
  "react" => true,
  "vanilla" => true,
])?>

<div class="container">
  <?php
  $post = get_post(61);
  setup_postdata($post);

  echo $builder->block("SinglePost", [
    "title" => get_the_title(),
    "content" => get_the_content(),
  ]);

  wp_reset_postdata(); ?>
</div>

<?php get_footer();
