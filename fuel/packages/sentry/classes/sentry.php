<?php

namespace Sentry;

class SentryException extends \FuelException {}

/**
 * Sentry
 *
 * @package     Fuel
 * @subpackage  Sentry
 */
class Sentry {

	/**
	 * @var  Sentry
	 */
	protected static $instance = null;

  /**
   * @var Raven_Client
   */
  protected static $client = null;

	/**
	 * Init, config loading.
	 */
	public static function _init() {
		\Config::load('sentry', true);

    self::$client = new \Raven_Client(\Config::get('sentry.dns'));

    if(!\Package::loaded('log')) {
      \Package::load('log');
    }

    system('echo "Sentry" > /tmp/fueldebug');

    \Log\Log::instance()->pushHandler(new \Monolog\Handler\RavenHandler(self::$client)); 
	}

	/**
	 * Prevent instantiation
	 */
	final private function __construct() {}

	/**
	 * Return the Sentry instance
	 */
	public static function instance()
	{
		return static::$instance;
	}
}

/* end of file sentry.php */
