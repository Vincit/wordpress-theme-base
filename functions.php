<?php

/*
 * Instead of polluting this file with thousands of lines, add your module into inc/ and it is "autoloaded".
 * Do not output anything in these files directly!
 * Output is shown in REST responses and displayed on the page, and it breaks RSS feeds.
 */

require_once "inc/Global.php"; // Load the global Vincit namespace first

foreach (glob(dirname(__FILE__) . "/inc/*") as $filename) {
  if (!is_dir($filename)) {
    require_once($filename);
  }
}
