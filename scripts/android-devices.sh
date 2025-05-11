#!/bin/bash

# Print header
print_header() {
    echo "========================================"
    echo "      CONNECTED ANDROID DEVICES"
    echo "========================================"
}

# List ADB devices
list_devices() {
    echo "Checking for connected Android devices..."
    
    # Check if adb is installed
    if ! command -v adb &> /dev/null; then
        echo "Error: ADB is not installed or not in PATH"
        echo "Please install Android SDK platform tools"
        exit 1
    fi
    
    # Start ADB server if not running
    adb start-server > /dev/null
    
    # Get devices
    devices=$(adb devices | grep -v "List" | grep -v "^$")
    
    if [ -z "$devices" ]; then
        echo "No Android devices connected."
    else
        echo ""
        echo "DEVICE ID                       STATUS"
        echo "--------------------------------------"
        echo "$devices" | while read -r line; do
            echo "$line" | awk '{printf "%-30s %s\n", $1, $2}'
        done
    fi
    echo ""
}

# Display device details for connected devices
device_details() {
    echo "Fetching device details..."
    echo ""
    
    devices=$(adb devices | grep -v "List" | grep -v "^$" | awk '{print $1}')
    
    if [ -z "$devices" ]; then
        return
    fi
    
    for device in $devices; do
        echo "Device: $device"
        echo "  • Model:     $(adb -s $device shell getprop ro.product.model)"
        echo "  • Android:   $(adb -s $device shell getprop ro.build.version.release)"
        echo "  • API Level: $(adb -s $device shell getprop ro.build.version.sdk)"
        echo "  • Brand:     $(adb -s $device shell getprop ro.product.brand)"
        echo "  • Device:    $(adb -s $device shell getprop ro.product.device)"
        echo ""
    done
}

# Main execution
print_header
list_devices

case "$1" in
    "details")
        device_details
        ;;
    *)
        echo "For detailed device information run: $0 details"
        ;;
esac 