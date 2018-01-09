<?php
namespace Vincit;

/**
 * Pagebuilder class is used to build layouts from flexible content fields,
 * but it's also used to save templates into variables.
 */
class Pagebuilder {
  public $data;
  public $templates;
  public static $instance;

  public function __construct($field_name = null, $doingItWrong = true) {
    $this->templates = $this->loadTemplates();

    if ($doingItWrong) {
      throw new \Exception("You shouldn't create a new instance of the pagebuilder. Use \Vincit\Pagebuilder::instance().");
    }

    $this->hasACF = function_exists("get_field");
    if ($this->hasACF && $field_name) {
      $this->data = \get_field($field_name);
    }
  }

  public static function instance($field_name = "pagebuilder") {
    if (is_null(self::$instance)) {
      self::$instance = new Pagebuilder($field_name, false);
    }

    return self::$instance;
  }

  public function loadTemplates() {
    $templates = [];

    foreach (glob(dirname(__FILE__) . "/templates/*") as $filename) {
      require_once($filename);

      $template = str_replace(".php", "", basename($filename));
      $function = "\\Vincit\\template\\$template";
      $templates[$template] = $function;

      if (!is_callable($function)) {
        throw new \Exception("$template isn't a function!");
      }
    }

    return $templates;
  }

  /**
   * Method used to render a template into string.
   * There's nothing wrong with calling \Vincit\Template\SinglePost($data)
   * directly, but this class protects you from namespace changes and
   * can deal with errors if necessary.
   *
   * @param string $layout
   * @param array $data
   */
  public function block($layout = null, $data = []) {
    if (is_null($layout)) {
      throw new \Exception("Selected block layout can't be null.");
    }

    if (isset($data[$layout])) {
      // If there's an entry with the same key, it's most likely an ACF Group,
      // which adds one more layer, unless we get rid of it.

      $data = $data[$layout]; // Get rid of the extra layer
    }

    ob_start();
    $this->templates[$layout]($data);
    $template = ob_get_clean();

    return $template;
  }

  public function getLayout() {
    if (!$this->hasACF) {
      return "This feature requires Advanced Custom Fields Pro.";
    }

    $blocks = [];

    foreach ($this->data as $i => $block) {
      $blocks[] = $this->block($block["acf_fc_layout"], $block);
    }

    return join("\n", $blocks);
  }
}

