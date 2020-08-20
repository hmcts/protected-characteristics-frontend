#!/usr/bin/env bash
echo ${TEST_URL}
zap-api-scan.py -t ${TEST_URL}/v2/api-docs -f openapi -S -d -u ${SecurityRules} -P 8090 -l FAIL
cat zap.out
zap-cli --zap-url http://0.0.0.0 -p 8090 report -o /zap/api-report.html -f html
echo "listings of zap folder"
ls -la /zap
cp /zap/api-report.html functional-output/
curl --fail http://0.0.0.0:8090/OTHER/core/other/jsonreport/?formMethod=GET --output report.json
cp *.* functional-output/
zap-cli --zap-url http://0.0.0.0 -p 8090 alerts -l High --exit-code False
