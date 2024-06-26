#!/bin/bash

# file needs 755 permission on linux
# sudo chmod 755 test-script.sh

# Please install Xterm to make this script run

# Exit immediately if a command exits with a non-zero status
set -e

echo "Running Cypress end-to-end tests on the production url"
xterm -hold -e "pnpm cypress run --browser chrome
--config baseUrl=https://preview-curntly-configurator.vercel.app --spec cypress/e2e/NewConfigTest.cy.ts"&

# Use bellow command for manualy launching the cypress browser
# pnpm cypress open --browser chrome
# --config baseUrl=https://preview-curntly-configurator.vercel.app --e2e cypress/e2e/NewConfigTest.cy.ts
