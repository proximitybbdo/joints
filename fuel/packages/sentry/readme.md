# Fuel Sentry Logger Package.

A helper to log errors to Sentry (https://app.getsentry.com).

# Summary

* Send logs to Sentry through Raven (A PHP Sentry client)
* Capture errors and send to Sentry
* Overwrite error handlers and send all errors to Sentry

# Usage

  The dns for Sentry is set in the config file inside config/

  Sentry::log('Your log message');
  Sentry::exception($e);

