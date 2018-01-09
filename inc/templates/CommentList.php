<?php
namespace Vincit\Template;

/**
 * Lists comments under the current post context.
 *
 * @param array $data
 */
function CommentList($data = []) {
  $data = params([
    "post_id" => null,
    "wp_list_comments_args" => [],
    "get_comments_args" => [],
  ], $data);

  if (empty($data["post_id"])) {
    throw new \Exception("Unable to get comments without post_id");
  }

  echo wp_list_comments(
    array_replace_recursive(
      [
        "echo" => false,
      ],
      $data["wp_list_comments_args"]
    ),
    get_comments(
      array_replace_recursive(
        [
          "post_id" => $data["post_id"],
        ],
        $data["get_comments_args"]
      )
    )
  );
}
