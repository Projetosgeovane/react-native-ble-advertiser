// Configuração alternativa para o EAS CLI
// Use este arquivo se o plugin não funcionar

module.exports = {
  expo: {
    name: "StiknTrak Connect",
    slug: "stikntrak-connect",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "stikntrakconnect",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.stikntrak.connect",
      infoPlist: {
        NSBluetoothAlwaysUsageDescription: "This app uses Bluetooth to function as a BLE gateway and connect with IoT devices.",
        NSBluetoothPeripheralUsageDescription: "This app uses Bluetooth to function as a BLE gateway and connect with IoT devices.",
        NSBluetoothWhenInUseUsageDescription: "This app uses Bluetooth to function as a BLE gateway and connect with IoT devices.",
        NSLocationWhenInUseUsageDescription: "This app uses location to identify device locations during BLE scanning.",
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.stikntrak.connect",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "BLUETOOTH_SCAN",
        "BLUETOOTH_CONNECT"
      ]
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-updates",
      "expo-location",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      [
        "expo-dev-client",
        {
          addGeneratedScheme: false
        }
      ],
      "expo-secure-store"
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    updates: {
      url: "https://u.expo.dev/8a116fe3-1860-4f51-8a3b-f884b97fd8b4"
    },
    runtimeVersion: {
      policy: "sdkVersion"
    },
    extra: {
      router: {},
      eas: {
        projectId: "8a116fe3-1860-4f51-8a3b-f884b97fd8b4"
      }
    },
    owner: "geovane.silva"
  }
};
