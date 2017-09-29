<?php get_header(); ?>

<div class="container">
  <?php while (have_posts()) { the_post(); ?>
  <article <?php post_class()?>>
    <a href="<?=get_permalink()?>">
      <?=the_title()?>
    </a>
  </article>
  <?php } ?>
</div>

<?php get_footer();
