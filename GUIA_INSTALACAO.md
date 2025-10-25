# Guia de Instalação - React Native BLE Advertiser para Expo

## 📦 Instalação no Seu Projeto

### 1. Instalar a Biblioteca

No seu projeto Expo, execute um dos comandos abaixo:

```bash
# Usando npm
npm install react-native-ble-advertiser

# Ou usando yarn
yarn add react-native-ble-advertiser
```

### 2. Configurar o app.json/app.config.js

Adicione o plugin no seu arquivo de configuração do Expo:

```json
{
  "expo": {
    "name": "Seu App",
    "slug": "seu-app",
    "version": "1.0.0",
    "plugins": [
      "react-native-ble-advertiser",
      // ... outros plugins
    ],
    "ios": {
      "infoPlist": {
        "NSBluetoothAlwaysUsageDescription": "Este app usa Bluetooth para anunciar e escanear dispositivos próximos.",
        "NSBluetoothPeripheralUsageDescription": "Este app usa Bluetooth para anunciar e escanear dispositivos próximos.",
        "NSBluetoothWhenInUseUsageDescription": "Este app usa Bluetooth para anunciar e escanear dispositivos próximos.",
        "NSLocationWhenInUseUsageDescription": "Este app usa localização para identificar dispositivos durante o escaneamento BLE."
      }
    },
    "android": {
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "BLUETOOTH",
        "BLUETOOTH_ADMIN",
        "BLUETOOTH_SCAN",
        "BLUETOOTH_CONNECT"
      ]
    }
  }
}
```

### 3. Usar no Código

```javascript
import BLEAdvertiser from 'react-native-ble-advertiser';

// Configurar company ID (opcional)
BLEAdvertiser.setCompanyId(123);

// Iniciar broadcast
const startBroadcast = async () => {
  try {
    const result = await BLEAdvertiser.broadcast(
      '12345678-1234-1234-1234-123456789abc', // UUID do serviço
      [1, 2, 3, 4] // Dados de manufatura
    );
    console.log('Broadcasting iniciado:', result);
  } catch (error) {
    console.error('Erro ao iniciar broadcast:', error);
  }
};

// Parar broadcast
const stopBroadcast = async () => {
  try {
    const result = await BLEAdvertiser.stopBroadcast();
    console.log('Broadcast parado:', result);
  } catch (error) {
    console.error('Erro ao parar broadcast:', error);
  }
};

// Escanear dispositivos
const startScan = async () => {
  try {
    const result = await BLEAdvertiser.scan([1, 2, 3, 4]); // Filtro de dados
    console.log('Escaneamento iniciado:', result);
  } catch (error) {
    console.error('Erro ao iniciar escaneamento:', error);
  }
};

// Escanear por serviço específico
const startScanByService = async () => {
  try {
    const result = await BLEAdvertiser.scanByService(
      '12345678-1234-1234-1234-123456789abc' // UUID do serviço
    );
    console.log('Escaneamento por serviço iniciado:', result);
  } catch (error) {
    console.error('Erro ao iniciar escaneamento por serviço:', error);
  }
};

// Parar escaneamento
const stopScan = async () => {
  try {
    const result = await BLEAdvertiser.stopScan();
    console.log('Escaneamento parado:', result);
  } catch (error) {
    console.error('Erro ao parar escaneamento:', error);
  }
};

// Verificar estado do adaptador
const checkAdapterState = async () => {
  try {
    const state = await BLEAdvertiser.getAdapterState();
    console.log('Estado do adaptador:', state);
  } catch (error) {
    console.error('Erro ao verificar estado:', error);
  }
};

// Verificar se está ativo
const checkIsActive = async () => {
  try {
    const isActive = await BLEAdvertiser.isActive();
    console.log('Adaptador ativo:', isActive);
  } catch (error) {
    console.error('Erro ao verificar se está ativo:', error);
  }
};
```

### 4. Escutar Eventos

```javascript
import { NativeEventEmitter, NativeModules } from 'react-native';

const { BLEAdvertiser } = NativeModules;
const bleAdvertiserEmitter = new NativeEventEmitter(BLEAdvertiser);

// Escutar quando um dispositivo é encontrado
useEffect(() => {
  const deviceFoundSubscription = bleAdvertiserEmitter.addListener(
    'onDeviceFound',
    (device) => {
      console.log('Dispositivo encontrado:', device);
      // device contém:
      // - serviceUuids: array de UUIDs
      // - rssi: força do sinal
      // - deviceName: nome do dispositivo
      // - deviceAddress: endereço do dispositivo
      // - txPower: potência de transmissão
    }
  );

  // Escutar mudanças no estado do Bluetooth
  const btStatusSubscription = bleAdvertiserEmitter.addListener(
    'onBTStatusChange',
    (status) => {
      console.log('Status do Bluetooth mudou:', status);
      // status.enabled indica se o Bluetooth está ligado
    }
  );

  return () => {
    deviceFoundSubscription.remove();
    btStatusSubscription.remove();
  };
}, []);
```

## 🔧 Comandos Úteis

### Limpar e Reinstalar
```bash
# Limpar cache do Expo
npx expo start --clear

# Limpar node_modules e reinstalar
rm -rf node_modules
npm install
# ou
yarn install

# Para iOS, limpar pods
cd ios && pod install && cd ..
```

### Build para Produção
```bash
# Build para iOS
eas build --platform ios

# Build para Android
eas build --platform android
```

## ⚠️ Importante

1. **Teste em Dispositivo Físico**: BLE não funciona no simulador iOS
2. **Permissões**: Certifique-se de que as permissões estão configuradas corretamente
3. **UUIDs**: Use UUIDs válidos para serviços BLE
4. **Estado do Bluetooth**: Sempre verifique se o Bluetooth está ligado antes de usar

## 🐛 Solução de Problemas

### Erro de Autolink
```bash
npx expo install --fix
```

### Erro de Pods (iOS)
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Erro de Permissões
Verifique se todas as permissões necessárias estão no `app.json`

## 📱 Exemplo Completo

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import BLEAdvertiser from 'react-native-ble-advertiser';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { BLEAdvertiser: BLEModule } = NativeModules;
const bleAdvertiserEmitter = new NativeEventEmitter(BLEModule);

export default function BLEExample() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Configurar company ID
    BLEAdvertiser.setCompanyId(123);

    // Escutar dispositivos encontrados
    const deviceFoundSubscription = bleAdvertiserEmitter.addListener(
      'onDeviceFound',
      (device) => {
        setDevices(prev => [...prev, device]);
      }
    );

    return () => {
      deviceFoundSubscription.remove();
    };
  }, []);

  const startBroadcast = async () => {
    try {
      await BLEAdvertiser.broadcast(
        '12345678-1234-1234-1234-123456789abc',
        [1, 2, 3, 4]
      );
      setIsBroadcasting(true);
      Alert.alert('Sucesso', 'Broadcast iniciado!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const stopBroadcast = async () => {
    try {
      await BLEAdvertiser.stopBroadcast();
      setIsBroadcasting(false);
      Alert.alert('Sucesso', 'Broadcast parado!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const startScan = async () => {
    try {
      await BLEAdvertiser.scan([1, 2, 3, 4]);
      setIsScanning(true);
      setDevices([]);
      Alert.alert('Sucesso', 'Escaneamento iniciado!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const stopScan = async () => {
    try {
      await BLEAdvertiser.stopScan();
      setIsScanning(false);
      Alert.alert('Sucesso', 'Escaneamento parado!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>BLE Advertiser Example</Text>
      
      <Button
        title={isBroadcasting ? "Parar Broadcast" : "Iniciar Broadcast"}
        onPress={isBroadcasting ? stopBroadcast : startBroadcast}
      />
      
      <Button
        title={isScanning ? "Parar Scan" : "Iniciar Scan"}
        onPress={isScanning ? stopScan : startScan}
      />
      
      <Text>Dispositivos encontrados: {devices.length}</Text>
      {devices.map((device, index) => (
        <Text key={index}>
          {device.deviceName || 'Dispositivo sem nome'} - RSSI: {device.rssi}
        </Text>
      ))}
    </View>
  );
}
```

Agora sua biblioteca está pronta para ser usada em qualquer projeto Expo! 🚀
