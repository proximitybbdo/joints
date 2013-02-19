<?php

class Controller_Users extends Controller_Rest {

  protected $format = 'json';

  public function get_index() {

    // backbone expects response to be
    // array of models, not an indexed
    // array of models. Fuel outputs like
    // this when using the ORM result:
    //
    // { 1: {model}, 2: {model}}
    //
    // Backbone (by default) wants:
    //
    // {{model}, {model}}
    
    $users = [];
    $users_tmp = Model_User::find('all');

    foreach ($users_tmp as $user) {
      $users[] = $user;
    }

    return $this->response($users);
  }

  public function post_index() {
    $request = file_get_contents('php://input');
    $request = json_decode($request);

    Model_User::forge(array(
      'username' => $request->username,
      'email' => $request->email
    ))->save();
   
    return 1;
  }

  public function put_user($id) {
    $request = file_get_contents('php://input');
    $request = json_decode($request);

    $user = Model_User::find($id);

    if(is_null($user)) {
      return 'user_not_found';
    } else {
      $user->username = $request->username;
      $user->email = $request->email;
      $user->save();
    }
  }

  public function delete_user($id) {
    $request = file_get_contents('php://input');
    $request = json_decode($request);

    $user = Model_User::find($id);

    if(is_null($user)) {
      return 'user_not_found';
    } else {
      $user->delete();
    }
  }

  public function get_user($id) {
    return $this->response(Model_User::find($id));
  }

}
