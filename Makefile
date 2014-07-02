.PHONY: all build

all: build

build: node_modules

dist: build
	mkdir -p dist && ./node_modules/.bin/browserify -s ActivityPhraseFeed index.js -t brfs -o dist/activity-phrase-feed.js

watch: build
	./node_modules/.bin/watchify -s ActivityPhraseFeed index.js -t brfs -o dist/activity-phrase-feed.js

# if package.json changes, install
node_modules: package.json
	npm install
	touch $@

server: build
	npm start

test: build
	npm test

# test watcher
testw: build
	npm run testw

clean:
	rm -rf node_modules dist

package: dist

env=dev
deploy: dist
	./node_modules/.bin/lfcdn -e $(env)

