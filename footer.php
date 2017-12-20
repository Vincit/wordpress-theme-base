<?php
namespace Vincit;

use \Vincit\Options;

?>
  </main>
  <footer class="site-footer">
    <div class="container">

    </div>
    <div class="container">
      <div class="vanilla-widgets">
        <div class="clock"></div>
        <div class="post-list"></div>
      </div>
      <div class="react-widget-container"></div>

      <p class="copyright"><?=Options\get("copyright_text")?></p>
    </div>
  </footer>
  <?php wp_footer(); ?>
  </body>
</html>
