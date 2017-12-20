<?php
namespace Vincit\Template;

function Pagination($data = []) {
  $data = params([
    "paginate_links_args" => [
      "mid_size" => 2,
      "prev_text" => "Previous",
      "next_text" => "Next",
      "before_page_number" => "<span class='screen-reader-text'>Page</span>",
    ],
  ], $data); ?>

  <div class='pagination'>
    <?=paginate_links($data["paginate_links_args"])?>
  </div><?php
}
