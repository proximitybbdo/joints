<?php
class Asset extends \Fuel\Core\Asset {
	/**
	 * JS
	 *
	 * Either adds the javascript to the group, or returns the script tag.
	 * When in production mode and configurated with minifies_production_js => true
	 * this will search for minified javascript files
	 *
	 * @access	public
	 * @param	mixed	The file name, or an array files.
	 * @param	array	An array of extra attributes
	 * @param	string	The asset group name
	 * @return	string
	 */
	public static function js($scripts = array(), $attr = array(), $group = NULL, $raw = false) {
		if(Fuel::$env == "production" && Config::get("minifies_production_js")) {
			$scripts = str_replace(".js", ".min.js", $scripts);
		}
		return static::instance()->js($scripts, $attr, $group, $raw);
	}
}
