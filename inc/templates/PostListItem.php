<?php
namespace Vincit\Template;

use \Vincit\Media;

/**
 * PostListItem is meant to be used in conjuction with PostList, but it work as stand alone also.
 *
 * @param array $data
 */
function PostListItem($data = []) {
  $data = params([
    "title" => null,
    "content" => null,
    "image" => null,
    "permalink" => null,
  ], $data);

  if (!$data["title"]) {
    return false;
  }
  ?>
  <article <?php post_class("post-list__item")?>>
    <header class="post-list__item--header">
      <a <?=permalink($data["permalink"])?>>
        <h2><?=title($data["title"])?></h2>
      </a>
    </header>

    <section class="post-list__item--content">
      <?php
      if ($data["image"]) {
        echo Media\image($data["image"], "thumbnail");
      }

      echo content($data["content"]); ?>
    </section>
  </article>
<?php }
