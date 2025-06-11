# Android Emulator GPS Setup Guide

## Method 1: Using Android Studio Emulator Extended Controls

1. **Open your Android emulator**
2. **Click the "..." button** (More tools) in the emulator panel
3. **Go to Location tab**
4. **Enter coordinates manually:**
   - **Ho Chi Minh City**: Latitude: 10.8231, Longitude: 106.6297
   - **Hanoi**: Latitude: 21.0285, Longitude: 105.8542
   - **Da Nang**: Latitude: 16.0471, Longitude: 108.2068
   - **Dong Thap**: Latitude: 10.4591, Longitude: 105.6384

5. **Click "Send"** to set the location

## Method 2: Using ADB Commands

Open terminal/command prompt and run:

```bash
# Set location to Ho Chi Minh City
adb emu geo fix 106.6297 10.8231

# Set location to Hanoi
adb emu geo fix 105.8542 21.0285

# Set location to Da Nang  
adb emu geo fix 108.2068 16.0471

# Set location to Dong Thap
adb emu geo fix 105.6384 10.4591
```

## Method 3: Using the App's Built-in Location Selector

The app now includes a location selector that will automatically offer you Vietnamese cities to choose from when GPS fails. Simply:

1. Start the app
2. If GPS fails, you'll see an alert asking to choose a location
3. Select from: Ho Chi Minh, Hanoi, Da Nang, or Dong Thap
4. The app will load weather data for that location

## Testing on Real Device

If you want to test on a real Android device:

1. Enable **Developer Options**
2. Go to **Settings > Developer Options > Select mock location app**
3. Choose your app or install a GPS mocking app
4. Use apps like "GPS Emulator" to set fake coordinates

## Notes

- The app automatically detects emulator environment and provides fallback options
- All locations are Vietnamese cities with real weather data
- The weather API key is already configured and working
