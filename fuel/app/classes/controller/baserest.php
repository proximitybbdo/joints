<?php

class Controller_BaseRest extends Controller_Rest
{
  protected $format = 'json';

  protected function get_request() {
    $request = file_get_contents('php://input');
    $request = json_decode($request);
  }
}
