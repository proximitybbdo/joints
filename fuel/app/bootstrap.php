<?php

header('P3P: CP="CAO PSA OUR"');

// Load in the Autoloader
require COREPATH.'classes'.DIRECTORY_SEPARATOR.'autoloader.php';
class_alias('Fuel\\Core\\Autoloader', 'Autoloader');

// Bootstrap the framework DO NOT edit this
require COREPATH.'bootstrap.php';

Autoloader::add_classes(array(
	// Add classes you want to override here
	// Example: 'View' => APPPATH.'classes/view.php',
  'Asset' => APPPATH.'classes/ext/asset.php',
	'Uri' => APPPATH.'classes/ext/uri.php',
	'Helper' => APPPATH.'classes/helpers/helper.php',
));

// Register the autoloader
Autoloader::register();

// Autoloading composer installed packages
if(file_exists(dirname(COREPATH) . '/vendor/autoload.php')) {
  require dirname(COREPATH) . '/vendor/autoload.php';
}

/**
 * Your environment.  Can be set to any of the following:
 *
 * Fuel::DEVELOPMENT
 * Fuel::TEST
 * Fuel::STAGE
 * Fuel::PRODUCTION
 */
function get_env() {
  $env = 'PRODUCTION'; // default
  $files = array();
  $envs = array('PRODUCTION', 'STAGE', 'TEST', 'DEVELOPMENT'); // priority order

  foreach(glob(DOCROOT . '*', GLOB_NOSORT) as $file) {
    $files[] = basename($file);
  }

  foreach($envs as $state) {
    if(in_array($state, $files)) {
      return strtolower($state);
    }
  }

  return strtolower($env);
}

Fuel::$env = (isset($_SERVER['FUEL_ENV']) ? $_SERVER['FUEL_ENV'] : get_env());

// Initialize the framework with the config file.
Fuel::init('config.php');
