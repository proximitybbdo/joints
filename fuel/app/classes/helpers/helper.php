<?php

class Helper {
  /*
   * Returns active when the page correspondences one of the uri segments
   *
   * @param $page The current page
   * @return String
   */
  public static function get_active($page) {
    echo Uri::has_segment($page) ? 'active' : '';
  }
}
