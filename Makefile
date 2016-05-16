BIN_DIR ?= ./node_modules/.bin
TOOLS_DIR ?= .
LOG = $(BIN_DIR)/bunyan -o short
RUN = $(TOOLS_DIR)/lib/run
PRESETS = '--presets=node5,stage-0'

default:
	@echo "\033[34mshaft-tools\033[0m"

#
# BUILD lib
#

build:
	@$(BIN_DIR)/babel $(PRESETS) src -d lib

build-with-sources:
	@$(BIN_DIR)/babel $(PRESETS) src -s -d lib

build-and-watch:
	@$(BIN_DIR)/babel $(PRESETS) src -w -d lib

build-with-sources-and-watch:
	@$(BIN_DIR)/babel $(PRESETS) src -w -s -d lib

clean-build:
	@rm -rf lib

#
# PUG COMPILING
#

build-pugs:
	@node $(RUN) buildPugs | $(LOG)

rename-jade-to-pug:
	@find 'templates' -depth -name '*.jade' -exec sh -c 'mv "$$1" "$${1%.jade}.pug"' _ {} \;

#
# SEMVER
#

patch:
	@node $(RUN) semver.patch | $(LOG)

minor:
	@node $(RUN) semver.minor | $(LOG)

major:
	@node $(RUN) semver.major | $(LOG)
