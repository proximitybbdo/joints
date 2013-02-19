<?php
return array(
	'_root_'  => 'default/index',
  '_404_'   => 'default/index',

  'api/users' => array(
    array('GET', new Route('users/index')),
    array('POST', new Route('users/create'))
  ),
  'api/users/(:num)' => array(
    array('GET', new Route('users/user/$1')),
  ),
);
