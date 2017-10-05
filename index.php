<?php get_header(); ?>

<div class="container">
  <?php
  $builder = new \Vincit\Pagebuilder();
  while (have_posts()) { the_post();
    echo $builder->block("SingleArticle", [
      "title" => apply_filters("the_title", get_the_title()),
      "content" => apply_filters("the_content", get_the_content()),
      "permalink" => get_permalink(),
    ]);
  }


  echo \Vincit\WP\tag([
    "<div class='pagination'>",
      paginate_links([
          "mid_size" => 2,
          "prev_text" => "Previous",
          "next_text" => "Next",
          "before_page_number" => "<span class='screen-reader-text'>Page</span>",
        ]),
    "</div>",
  ]); ?>
</div>

<?php get_footer();
