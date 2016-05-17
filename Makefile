BIN_DIR ?= './node_modules/.bin'
TOOLS_DIR ?= '.'
LOG = $(BIN_DIR)/bunyan -o short
TOOLS_RUN = $(TOOLS_DIR)/lib/run

# SHAFT-BUILD
#
# Settings:
#   BUILD_SRC = 'src'
#   BUILD_LIB = 'lib'
#   PRESETS = '--presets=node5,stage-0'
#
# Commands:
#   build
#   build-with-sources
#   build-and-watch
#   build-with-sources-and-watch
#   clean-build
#
include ./node_modules/shaft-build/Makefile
# /SHAFT-BUILD

#
# PUG COMPILING
#

build-pugs:
	@node $(TOOLS_RUN) buildPugs | $(LOG)

rename-jade-to-pug:
	@find 'templates' -depth -name '*.jade' -exec sh -c 'mv "$$1" "$${1%.jade}.pug"' _ {} \;

#
# SEMVER
#

patch:
	@node $(TOOLS_RUN) semver.patch | $(LOG)

minor:
	@node $(TOOLS_RUN) semver.minor | $(LOG)

major:
	@node $(TOOLS_RUN) semver.major | $(LOG)
