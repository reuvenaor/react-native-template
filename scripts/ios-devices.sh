#!/bin/bash

# Print header
print_header() {
    echo "========================================"
    echo "        CONNECTED IOS DEVICES"
    echo "========================================"
}

# List iOS devices
list_devices() {
    echo "Checking for connected iOS devices..."
    
    # Check if xcrun is installed
    if ! command -v xcrun &> /dev/null; then
        echo "Error: xcrun is not installed or not in PATH"
        echo "Please install Xcode Command Line Tools"
        exit 1
    fi
    
    # Get real devices
    real_devices=$(xcrun xctrace list devices 2>/dev/null | grep -v "^$" | grep -v "Devices" | grep -v "==" | grep -v "macOS" | grep -v "Simulator")
    
    # Get simulators
    simulators=$(xcrun simctl list devices | grep -v "^$" | grep "Booted" | sed 's/(.*)//g')
    
    if [ -z "$real_devices" ] && [ -z "$simulators" ]; then
        echo "No iOS devices or simulators detected."
    else
        if [ -n "$real_devices" ]; then
            echo ""
            echo "PHYSICAL DEVICES"
            echo "--------------------------------------"
            echo "$real_devices" | while read -r line; do
                echo "$line" | sed 's/ (.*)//'
            done
            echo ""
        fi
        
        if [ -n "$simulators" ]; then
            echo "RUNNING SIMULATORS"
            echo "--------------------------------------"
            echo "$simulators" | while read -r line; do
                echo "$line" | sed 's/^ *//'
            done
            echo ""
        fi
    fi
}

# Get detailed device info
device_details() {
    echo "Fetching device details..."
    echo ""
    
    if command -v ideviceinfo &> /dev/null; then
        devices=$(idevice_id -l)
        
        if [ -n "$devices" ]; then
            for device in $devices; do
                echo "Device: $device"
                echo "  • Product Name:  $(ideviceinfo -u $device -k ProductName)"
                echo "  • iOS Version:   $(ideviceinfo -u $device -k ProductVersion)"
                echo "  • Device Name:   $(ideviceinfo -u $device -k DeviceName)"
                echo "  • Model:         $(ideviceinfo -u $device -k DeviceClass)"
                echo "  • Hardware:      $(ideviceinfo -u $device -k HardwareModel)"
                echo ""
            done
        else
            echo "No detailed information available."
            echo "For detailed info, install libimobiledevice:"
            echo "  brew install libimobiledevice"
            echo ""
        fi
    else
        echo "For detailed device information, install libimobiledevice:"
        echo "  brew install libimobiledevice"
        echo ""
    fi
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
        echo "Note: Install libimobiledevice for detailed info"
        ;;
esac 