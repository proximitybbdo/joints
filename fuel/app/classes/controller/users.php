<?php

class Controller_Users extends Controller_BaseRest 
{
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
    $request = $this->get_request();

    Model_User::forge(array(
      'username' => $request->username,
      'email' => $request->email
    ))->save();
   
    return $this->response(1);
  }

  public function put_user($id) {
    $request = $this->get_request();

    $user = Model_User::find($id);

    if(is_null($user)) {
      return $this->response('user_not_found');
    } else {
      $user->username = $request->username;
      $user->email = $request->email;
      $user->save();
    }
  }

  public function delete_user($id) {
    $request = $this->get_request();

    $user = Model_User::find($id);

    if(is_null($user)) {
      return $this->response('user_not_found');
    } else {
      $user->delete();

      return $this->response(1);
    }
  }

  public function get_user($id) {
    return $this->response(Model_User::find($id));
  }

}
