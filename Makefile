BIN_DIR ?= node_modules/.bin

default:
	@echo "\033[34mshaft-tools\033[0m"

build:
	@$(BIN_DIR)/babel --presets=node6,stage-0 src -d lib

build-with-sources:
	@$(BIN_DIR)/babel --presets=node6,stage-0 src -s -d lib

build-and-watch:
	@$(BIN_DIR)/babel --presets=node6,stage-0 src -w -d lib

build-with-sources-and-watch:
	@$(BIN_DIR)/babel --presets=node6,stage-0 src -w -s -d lib

clean-build:
	@rm -rf lib

build-pugs:
	@node lib/run buildPugs | $(BIN_DIR)/bunyan -o short

rename-jade-to-pug:
	@find 'test-app' -depth -name '*.jade' -exec sh -c 'mv "$$1" "$${1%.jade}.pug"' _ {} \;
