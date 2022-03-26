#!/usr/bin/env bash
NETWORK="${1}"
FIRST_BLOCK="${2}"

echo "Generating subgraph.yaml for ${NETWORK} starting at block ${FIRST_BLOCK}"
cp subgraph.yaml.template subgraph.yaml


sed -i "s/%%NETWORK%%/${NETWORK}/;s/%%FIRST_BLOCK%%/${FIRST_BLOCK}/" subgraph.yaml

echo "Creating tradescrow/${NETWORK} subgraph"
graph create \
  --product hosted-service \
  --node https://mgmt.graph.dfk.af \
  "tradescrow/${NETWORK}"

echo "Deploying tradescrow/${NETWORK} subgraph"
graph deploy \
  --product hosted-service \
  --node https://mgmt.graph.dfk.af  \
  --ipfs http://graph.dfk.af:5001 \
  --version-label 1.0.0 \
  --output-dir "build/${NETWORK}" \
  "tradescrow/${NETWORK}"


echo "Removing generated subgraph.yaml"
rm subgraph.yaml

graph create --node https://graph.t.hmny.io:8020 tradescrow/harmony