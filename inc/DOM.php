<?php
/**
 * If you need to work with the DOM using PHP, here are some helpers.
 * In reality you probably want to avoid the DOM and PHP, as nothing ever works.
 */

namespace Vincit\DOM;

/**
 * DOMDocument adds "missing" doctype and head & body tags automatically
 * so those need to be removed. $dom->saveHTML takes a node as a param, but
 * getting a node isn't exactly straight forward, so it saves the node into a prop
 * and that prop is then used by output() to get the right node.
 *
 * HTML *needs* to have a single root node, wrap multiple <li> elements in <ul> and so on.
 *
 * @param mixed $html
 */
function parse($html) {
  $dom = new \DOMDocument();
  $dom->loadHTML($html);
  $dom->actualRootNode = $dom->getElementsByTagName("body")[0]->firstChild;

  return $dom;
}

/**
 * Output node.
 *
 * @param DOMDocument $dom
 * @param mixed $node
 */
function output(\DOMDocument $dom, $node = null) {
  $node = is_null($node) ? $dom->actualRootNode : $node;
  return $dom->saveHTML($node);
}
