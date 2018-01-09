<?php
/**
 * The static front page template.
 */
namespace Vincit;

get_header(); ?>

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

<?php get_footer();
