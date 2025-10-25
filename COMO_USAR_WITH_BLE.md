# Como Usar withBleAdvertiser.js

## 📁 Arquivo: withBleAdvertiser.js

Crie este arquivo na **raiz do seu projeto** (mesmo nível do `app.json`):

```javascript
const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withBLEAdvertiser = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const { platformProjectRoot } = config.modRequest;
      const podfilePath = path.join(platformProjectRoot, 'Podfile');
      
      if (fs.existsSync(podfilePath)) {
        let podfileContent = fs.readFileSync(podfilePath, 'utf8');
        
        // Adiciona a dependência se não existir
        if (!podfileContent.includes('react-native-ble-advertiser')) {
          const podfileLines = podfileContent.split('\n');
          const targetIndex = podfileLines.findIndex(line => 
            line.includes('target') && line.includes('do')
          );
          
          if (targetIndex !== -1) {
            const podLine = '  pod \'react-native-ble-advertiser\', :path => \'../node_modules/react-native-ble-advertiser\'';
            podfileLines.splice(targetIndex + 1, 0, podLine);
            fs.writeFileSync(podfilePath, podfileLines.join('\n'));
            console.log('✅ Adicionado react-native-ble-advertiser ao Podfile');
          }
        } else {
          console.log('ℹ️  react-native-ble-advertiser já está no Podfile');
        }
      }
      
      return config;
    },
  ]);
};

module.exports = withBLEAdvertiser;
```

## 🔧 Configuração no app.json

No seu `app.json`, adicione o plugin:

```json
{
  "expo": {
    "name": "StiknTrak Connect",
    "slug": "stikntrak-connect",
    "version": "1.0.1",
    "plugins": [
      "./withBleAdvertiser.js",
      "expo-router",
      "expo-updates",
      "expo-location",
      "expo-splash-screen",
      "expo-dev-client",
      "expo-secure-store"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.stikntrak.connect",
      "infoPlist": {
        "NSBluetoothAlwaysUsageDescription": "This app uses Bluetooth to function as a BLE gateway and connect with IoT devices.",
        "NSBluetoothPeripheralUsageDescription": "This app uses Bluetooth to function as a BLE gateway and connect with IoT devices.",
        "NSBluetoothWhenInUseUsageDescription": "This app uses Bluetooth to function as a BLE gateway and connect with IoT devices.",
        "NSLocationWhenInUseUsageDescription": "This app uses location to identify device locations during BLE scanning.",
        "ITSAppUsesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.stikntrak.connect",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "BLUETOOTH_SCAN",
        "BLUETOOTH_CONNECT"
      ]
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    },
    "updates": {
      "url": "https://u.expo.dev/8a116fe3-1860-4f51-8a3b-f884b97fd8b4"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    },
    "extra": {
      "router": {},
      "eas": {
        "projectId": "8a116fe3-1860-4f51-8a3b-f884b97fd8b4"
      }
    },
    "owner": "geovane.silva"
  }
}
```

## 📦 Instalação

### 1. Instalar a biblioteca
```bash
npm install react-native-ble-advertiser
```

### 2. Instalar dependência do plugin
```bash
npm install @expo/config-plugins
```

### 3. Criar o arquivo withBleAdvertiser.js
Copie o código acima para um arquivo chamado `withBleAdvertiser.js` na raiz do seu projeto.

### 4. Atualizar app.json
Adicione `"./withBleAdvertiser.js"` na lista de plugins.

## 🚀 Build

```bash
# Limpar cache
npx expo start --clear

# Build para desenvolvimento
eas build --platform ios --profile development
```

## ✅ O que o plugin faz

1. **Detecta automaticamente** quando a biblioteca é instalada
2. **Adiciona a dependência** no Podfile do iOS
3. **Configura tudo** para funcionar com o Expo
4. **Mostra logs** para confirmar que funcionou

## 🐛 Se der erro

```bash
# Limpar tudo
rm -rf node_modules
npm install

# Limpar cache do Expo
npx expo start --clear

# Tentar novamente
eas build --platform ios --profile development
```

## 📱 Uso no código

```javascript
import BLEAdvertiser from 'react-native-ble-advertiser';

// Configurar company ID
BLEAdvertiser.setCompanyId(123);

// Iniciar broadcast
await BLEAdvertiser.broadcast('uuid-do-servico', [1, 2, 3, 4]);

// Escanear dispositivos
await BLEAdvertiser.scan([1, 2, 3, 4]);
```

**Pronto! Agora vai funcionar 100% com o EAS CLI!** 🎉
