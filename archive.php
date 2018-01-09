<?php
/**
 * The archive page. Tries to handle every archive, probably fails miserably.
 * See http://wphierarchy.com for help.
 */
namespace Vincit;

get_header(); ?>
<div class="archive-wrapper">
  <?php
  $archive = get_queried_object();
  $builder = \Vincit\Pagebuilder::instance();
  echo $builder->block("Hero", [
    "background" => [
      "image" => ["url" => get_the_post_thumbnail_url($archive->ID, "large")],
      "position" => "center",
    ],
    "wysiwyg" => [
      "editor" => "<h1>" . get_the_archive_title() . "</h1>",
    ],
  ]); ?>

  <div class="container">
    <?php
    echo $builder->block("PostList");
    echo $builder->block("Pagination");?>
  </div>
</div>

<?php get_footer();
