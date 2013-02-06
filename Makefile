TESTS = test/spec/**/*.coffee

test:
	@./node_modules/mocha/bin/mocha \
		--ui bdd \
		--reporter list \
		--slow 2000ms \
		--bail \
		--compilers coffee:coffee-script \
		$(TESTS)

test-watch:
	@./node_modules/mocha/bin/mocha \
		--ui bdd \
		--reporter list \
		--slow 2000ms \
		--bail \
		--watch \
		--compilers coffee:coffee-script \
		$(TESTS)

.PHONY: test test-watch
