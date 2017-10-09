<?php
namespace Vincit\template;

function SingleArticle($data = []) { ?>
  <article <?php post_class("single-article")?>>
    <header class="article-header">
      <?php
      if ($data["featured_image"]) {
        echo \Vincit\WP\Media\image($data["featured_image"], "large");
      }
      ?>
      <?php if (is_singular()) { ?>
        <h1><?=$data["title"]?></h1>
      <?php } else { ?>
        <a href="<?=$data["permalink"]?>">
          <h1><?=$data["title"]?></h1>
        </a>
      <?php } ?>
    </header>

    <section class="article-content">
      <?=$data["content"]?>
    </section>

    <footer class="article-footer">
    <?php
    global $numpages; /* If post has pagebreaks, and the post is shown in singular form,
    show the pagination. */
    if (is_singular() && $numpages > 1) { ?>
      <div class="pagination article-pagination">
        <?php wp_link_pages(); ?>
      </div>
    <?php } ?>
    </footer>
  </article>
<?php }
