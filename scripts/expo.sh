#!/bin/bash

# Run Expo doctor
expo_doctor() {
    npx expo-doctor
}

# Check Expo dependencies
expo_check() {
    npx expo install --check
}

# Run on Android
expo_android() {
    expo run:android
}

# Run on iOS
expo_ios() {
    expo run:ios
}

# Execute the function based on the argument
case "$1" in
    "doctor")
        expo_doctor
        ;;
    "check")
        expo_check
        ;;
    "android")
        expo_android
        ;;
    "ios")
        expo_ios
        ;;
    *)
        echo "Usage: $0 {doctor|check|android|ios}"
        exit 1
        ;;
esac 