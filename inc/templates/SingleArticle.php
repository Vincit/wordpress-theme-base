<?php
namespace Vincit\template;

function SingleArticle($data = []) { ?>
  <article <?php post_class()?>>
    <header>
      <h1><?=$data["title"]?></h1>
    </header>
    <section>
      <?=$data["content"]?>
    </section>
    <footer>

    </footer>
  </article>
<?php }
