<?php
namespace Vincit\template;

/**
 * Sample form that's only useful for showcasing some form controls.
 *
 * @param array $data
 */
function SampleForm($data = []) { ?>
  <form>
    <div class="fc-row left">
      <label for="input-fname" class="fc-1-2">
        <strong>First name</strong>
        <input type="text" name="fname" id="input-fname">
      </label>

      <label for="input-lname" class="fc-1-2">
        <strong>Last name</strong>
        <input type="text" name="lname" id="input-lname">
      </label>
    </div>

    <div class="fc-row left">
      <label for="input-email">
        <strong>Email</strong>
        <input type="email" name="email" id="input-email">
      </label>
    </div>

    <div class="fc-row left">
      <label for="input-subject">
        <strong>Subject</strong>
        <select name="subject" id="input-subject">
          <option value="1">First</option>
          <option value="2">Last</option>
        </select>
      </label>
    </div>

    <div class="fc-row checkbox-row">
      <label for="check-1">
        <input type="checkbox" name="check[]" value="1" id="check-1">
        First
      </label>

      <label for="check-2">
        <input type="checkbox" name="check[]" value="2" id="check-2">
        Second
      </label>

      <label for="check-3">
        <input type="checkbox" name="check[]" value="3" id="check-3">
        Third
      </label>
    </div>

    <div class="fc-row radio-row">
      <label for="radio-1" class="">
        <input type="radio" name="radio[]" value="1" id="radio-1">
        First
      </label>

      <label for="radio-2" class="">
        <input type="radio" name="radio[]" value="2" id="radio-2">
        Second
      </label>

      <label for="radio-3" class="">
        <input type="radio" name="radio[]" value="3" id="radio-3">
        Third
      </label>
    </div>

    <div class="fc-row">
      <input type="submit" value="Send" class="button">
    </div>
  </form>
<?php }
