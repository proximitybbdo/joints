<?php

namespace Fuel\Tasks;

class Populate {

	public static function run() {
    \DBUtil::truncate_table('users');

    \Model_User::forge(array('username' => 'jeroenb', 'email' => 'jeroen.bourgois@proximity.bbdo.be'))->save();
    \Model_User::forge(array('username' => 'pieterm', 'email' => 'pieter.michels@proximity.bbdo.be'))->save();
    \Model_User::forge(array('username' => 'krisvh', 'email' => 'kris.vanherzeele@proximity.bbdo.be'))->save();
	}

}
