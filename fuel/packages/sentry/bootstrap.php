<?php

Autoloader::add_core_namespace('Sentry');

Autoloader::add_classes(array(
	'Sentry\\Sentry'							=> __DIR__.'/classes/sentry.php',
));

// Raven dependency
require(__DIR__ . '/vendor/Raven/Autoloader.php');

Raven_Autoloader::register();

\Config::load('sentry');

if(\Config::get('autoload')) {
  Sentry::_init();
}
