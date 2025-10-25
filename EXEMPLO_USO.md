# Exemplo de Uso - React Native BLE Advertiser

## 🚀 Instalação no Seu Projeto

### 1. Instalar a biblioteca
```bash
npm install react-native-ble-advertiser
```

### 2. Configurar no app.json
```json
{
  "expo": {
    "name": "Seu App",
    "slug": "seu-app",
    "plugins": [
      "react-native-ble-advertiser"
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

### 3. Limpar cache e reiniciar
```bash
npx expo start --clear
```

## 📱 Exemplo de Código

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList } from 'react-native';
import BLEAdvertiser from 'react-native-ble-advertiser';
import { NativeEventEmitter, NativeModules } from 'react-native';

const { BLEAdvertiser: BLEModule } = NativeModules;
const bleAdvertiserEmitter = new NativeEventEmitter(BLEModule);

export default function BLEExample() {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [bluetoothStatus, setBluetoothStatus] = useState('Desconhecido');

  useEffect(() => {
    // Configurar company ID
    BLEAdvertiser.setCompanyId(123);

    // Escutar dispositivos encontrados
    const deviceFoundSubscription = bleAdvertiserEmitter.addListener(
      'onDeviceFound',
      (device) => {
        console.log('Dispositivo encontrado:', device);
        setDevices(prev => {
          // Evitar duplicatas
          const exists = prev.some(d => d.deviceAddress === device.deviceAddress);
          if (!exists) {
            return [...prev, { ...device, id: Date.now() }];
          }
          return prev;
        });
      }
    );

    // Escutar mudanças no status do Bluetooth
    const btStatusSubscription = bleAdvertiserEmitter.addListener(
      'onBTStatusChange',
      (status) => {
        console.log('Status do Bluetooth:', status);
        setBluetoothStatus(status.enabled ? 'Ligado' : 'Desligado');
      }
    );

    // Verificar status inicial
    checkBluetoothStatus();

    return () => {
      deviceFoundSubscription.remove();
      btStatusSubscription.remove();
    };
  }, []);

  const checkBluetoothStatus = async () => {
    try {
      const state = await BLEAdvertiser.getAdapterState();
      setBluetoothStatus(state);
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const startBroadcast = async () => {
    try {
      await BLEAdvertiser.broadcast(
        '12345678-1234-1234-1234-123456789abc', // UUID do serviço
        [1, 2, 3, 4] // Dados de manufatura
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
      await BLEAdvertiser.scan([1, 2, 3, 4]); // Filtro de dados
      setIsScanning(true);
      setDevices([]);
      Alert.alert('Sucesso', 'Escaneamento iniciado!');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const startScanByService = async () => {
    try {
      await BLEAdvertiser.scanByService('12345678-1234-1234-1234-123456789abc');
      setIsScanning(true);
      setDevices([]);
      Alert.alert('Sucesso', 'Escaneamento por serviço iniciado!');
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

  const clearDevices = () => {
    setDevices([]);
  };

  const renderDevice = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
      <Text style={{ fontWeight: 'bold' }}>
        {item.deviceName || 'Dispositivo sem nome'}
      </Text>
      <Text>RSSI: {item.rssi || 'N/A'}</Text>
      <Text>UUIDs: {item.serviceUuids?.join(', ') || 'Nenhum'}</Text>
      <Text>Endereço: {item.deviceAddress}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        BLE Advertiser Example
      </Text>
      
      <Text style={{ marginBottom: 10 }}>
        Status do Bluetooth: {bluetoothStatus}
      </Text>
      
      <View style={{ marginBottom: 20 }}>
        <Button
          title={isBroadcasting ? "Parar Broadcast" : "Iniciar Broadcast"}
          onPress={isBroadcasting ? stopBroadcast : startBroadcast}
        />
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Button
          title={isScanning ? "Parar Scan" : "Iniciar Scan"}
          onPress={isScanning ? stopScan : startScan}
        />
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Escanear por Serviço"
          onPress={startScanByService}
        />
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Button
          title="Limpar Dispositivos"
          onPress={clearDevices}
        />
      </View>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Dispositivos encontrados: {devices.length}
      </Text>
      
      <FlatList
        data={devices}
        renderItem={renderDevice}
        keyExtractor={(item) => item.id.toString()}
        style={{ flex: 1 }}
      />
    </View>
  );
}
```

## 🔧 Comandos de Solução de Problemas

Se der erro, execute na ordem:

```bash
# 1. Limpar cache do Expo
npx expo start --clear

# 2. Se ainda der erro, reinstalar dependências
rm -rf node_modules
npm install

# 3. Para iOS, limpar pods
cd ios
pod deintegrate
pod install
cd ..

# 4. Verificar se o plugin está funcionando
npx expo config --type introspect
```

## ⚠️ Importante

1. **Teste em dispositivo físico** - BLE não funciona no simulador iOS
2. **Permissões** - Certifique-se de que as permissões estão no app.json
3. **UUIDs válidos** - Use UUIDs válidos para serviços BLE
4. **Bluetooth ligado** - Verifique se o Bluetooth está ativo no dispositivo

## 🎯 Pronto!

Agora você pode usar a biblioteca no seu projeto Expo sem problemas! 🚀
