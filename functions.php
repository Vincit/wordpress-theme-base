<?php

/* Instead of polluting this file with thousands of lines, add your module into inc/ and it is "autoloaded". */
foreach (glob(dirname(__FILE__) . "/inc/*") as $filename) {
  require_once($filename);
}
