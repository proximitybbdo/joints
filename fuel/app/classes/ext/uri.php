<?php

class Uri extends \Fuel\Core\Uri 
{
	public static function last() {
		return array_pop(\Uri::segments());
	}
	
	public static function has_segment($needle) {
		return in_array($needle, \Uri::segments());
	}
}
