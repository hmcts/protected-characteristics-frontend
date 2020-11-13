#!/bin/bash
set -ex

NODE_ENV=testing NODE_PATH=. node ./node_modules/codeceptjs/bin/codecept.js run -c ./test/end-to-end/smoke.conf.js --reporter mocha-multi
