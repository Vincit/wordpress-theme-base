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
  $builder = \Vincit\Pagebuilder::instance();

  echo $builder->block("PostList");
  echo $builder->block("Pagination") ?>
</div>

<?php get_footer(); ?>
