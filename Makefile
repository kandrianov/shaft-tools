LOG = $(TOOLS_BIN_DIR)/bunyan -o short
TOOLS_RUN = $(TOOLS_DIR)/lib/run

# SHAFT-BUILD
BUILD_SRC = 'src'
BUILD_LIB = 'lib'
PRESETS = '--presets=node5,stage-0'
include ./node_modules/shaft-build/Makefile
# /SHAFT-BUILD

tools-name:
	@echo "\033[34m shaft-tools \033[0m"

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
