<?php get_header(); ?>

<div class="container">
  <form class="search-form" action="/">
    <input type="search" name="s" placeholder="Search from site">
    <button type="submit">Search</button>
  </form>

  <h1>
    Search: <?=get_search_query()?>
  </h1>

  <?php
  $builder = new \Vincit\Pagebuilder();
  while (have_posts()) { the_post();
    echo $builder->block("SingleArticle", [
      "title" => apply_filters("the_title", get_the_title()),
      "content" => \Vincit\WP\Post\excerpt(),
      "permalink" => get_permalink(),
    ]);
  }

  if (!have_posts()) {
    echo "<p>No results.</p>";
  }
  ?>
</div>

<?php get_footer(); ?>
