<?php

/**
 * @package  app
 * @extends  Controller
 */
class Controller_Default extends Controller_Base
{
  public function before() {
    parent::before();
  }

	public function get_index() {
    $data = array();

    $this->template->content = View::forge('index', $data);
	}

	/**
	 * The 404 action for the application.
	 */
	public function action_404() {
		return Response::forge(View::forge('404'));
	}
}
