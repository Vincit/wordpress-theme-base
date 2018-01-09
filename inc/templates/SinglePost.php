<?php
namespace Vincit\Template;

use \Vincit\Media;

/**
 * Singular post template. Not to be confused with singular.php!
 *
 * @param mixed $data
 */
function SinglePost($data = []) {
  global $numpages;

  $data = params([
    "title" => null,
    "content" => null,
    "image" => null,
    "pagination" => $numpages > 1
  ], $data);

  if (!$data["title"]) {
    return false;
  } ?>

  <article <?php post_class("spost")?>>
    <header class="spost__header">
      <?php
      if ($data["image"]) {
        echo Media\image($data["image"], "large");
      } ?>
      <h1 class="container"><?=title($data["title"])?></h1>
    </header>

    <section class="spost__content container">
      <?=content($data["content"])?>
    </section>

    <footer class="spost__footer container">
      <?php
      if (is_singular() && get_post_type() === "post") {
        SomeButtons();
      }

      if ($data["pagination"]) { ?>
        <div class="pagination spost__pagination">
          <?php wp_link_pages(); ?>
        </div>
      <?php } ?>
    </footer>
  </article>
<?php }
