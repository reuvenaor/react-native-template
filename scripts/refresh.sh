#!/bin/bash

# Clear watchman watches
refresh_watchman() {
    watchman watch-del-all
}

# Clean and reinstall node modules
refresh_modules() {
    rm -rf node_modules/ && npm install
}

# Reset cache and start
refresh_start() {
    npm run start --reset-cache
}

# Full refresh
refresh_all() {
    refresh_watchman
    refresh_modules
    refresh_start
}

# Execute the function based on the argument
case "$1" in
    "watchman")
        refresh_watchman
        ;;
    "modules")
        refresh_modules
        ;;
    "start")
        refresh_start
        ;;
    "all")
        refresh_all
        ;;
    *)
        echo "Usage: $0 {watchman|modules|start|all}"
        exit 1
        ;;
esac 