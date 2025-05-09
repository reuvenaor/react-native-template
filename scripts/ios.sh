#!/bin/bash

# iOS pod install with new architecture enabled
ios_pod_install() {
    cd ios && bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install && cd ..
}

# Clean iOS build
ios_clean() {
    cd ios && xcodebuild clean -workspace ExApp.xcworkspace -scheme ExApp && pod deintegrate && pod cache clean --all && cd ..
}

# Update iOS pods
ios_pod_update() {
    cd ios && pod install --repo-update && cd ..
}

# Execute the function based on the argument
case "$1" in
    "pod-install")
        ios_pod_install
        ;;
    "clean")
        ios_clean
        ;;
    "pod-update")
        ios_pod_update
        ;;
    *)
        echo "Usage: $0 {pod-install|clean|pod-update}"
        exit 1
        ;;
esac 