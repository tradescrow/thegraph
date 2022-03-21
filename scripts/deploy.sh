#!/usr/bin/env bash
NETWORK="${1}"
FIRST_BLOCK="${2}"

echo "Generating subgraph.yaml for ${NETWORK} starting at block ${FIRST_BLOCK}"
cp subgraph.yaml.template subgraph.yaml

if [[ "${NETWORK}" == "harmony" || "${NETWORK}" == "harmony-testnet" ]]; then
  echo "Nailed it"
    sed -i "s/%%NETWORK%%/mainnet/;s/%%FIRST_BLOCK%%/${FIRST_BLOCK}/" subgraph.yaml

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
else
    sed -i "s/%%NETWORK%%/${NETWORK}/;s/%%FIRST_BLOCK%%/${FIRST_BLOCK}/" subgraph.yaml

    echo "Setting ${NETWORK} deploy key"
    graph auth --product hosted-service "${THEGRAPH_ACCESS_TOKEN}"
    echo "Deploying tradescrow/${NETWORK} subgraph"
    graph deploy \
      --product hosted-service \
      --version-label 1.0.0 \
      --output-dir "build/${NETWORK}" \
      "tradescrow/${NETWORK}"
fi

echo "Removing generated subgraph.yaml"
rm subgraph.yaml

graph create --node https://graph.t.hmny.io:8020 tradescrow/harmony