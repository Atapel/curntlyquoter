#!/bin/bash

# file needs 755 permission on linux
# sudo chmod 755 test-script.sh

# Please install Xterm to make this script run

# Exit immediately if a command exits with a non-zero status
set -e

# Run Next.js build
echo "Building the application..."
next build

# Start the test server in the background
echo "Starting the test server..."
xterm -hold -e "pnpm start" &

# Capture Port of Server and pass it to Cypress

# Capture the process ID of the test server
# TEST_SERVER_PID=$!

# Run Cypress end-to-end tests
echo "Running Cypress end-to-end tests..."
# xterm -hold -e "pnpm cypress open --browser chrome --e2e cypress/e2e/NewConfigTest.cy.ts" &
xterm -hold -e "pnpm cypress run --browser chrome --spec cypress/e2e/NewConfigTest.cy.ts" &

# # Stop the test server
# echo "Stopping the test server..."
# kill $TEST_SERVER_PID

echo "All tests completed."