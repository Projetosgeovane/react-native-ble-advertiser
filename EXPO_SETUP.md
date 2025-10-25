# Configuração para Expo

Este fork foi ajustado para funcionar corretamente com o Expo e o sistema de autolink.

## Instalação

1. Instale o pacote:
```bash
npm install react-native-ble-advertiser
# ou
yarn add react-native-ble-advertiser
```

2. Para projetos Expo, o autolink será configurado automaticamente.

## Configuração no app.json/app.config.js

Adicione o plugin no seu arquivo de configuração do Expo:

```json
{
  "expo": {
    "plugins": [
      "react-native-ble-advertiser"
    ]
  }
}
```

## Uso

```javascript
import BLEAdvertiser from 'react-native-ble-advertiser';

// Configurar company ID
BLEAdvertiser.setCompanyId(123);

// Iniciar broadcast
BLEAdvertiser.broadcast('12345678-1234-1234-1234-123456789abc', [1, 2, 3, 4])
  .then(result => console.log('Broadcasting:', result))
  .catch(error => console.error('Error:', error));

// Parar broadcast
BLEAdvertiser.stopBroadcast()
  .then(result => console.log('Stopped:', result));

// Escanear dispositivos
BLEAdvertiser.scan([1, 2, 3, 4])
  .then(result => console.log('Scanning:', result));

// Parar escaneamento
BLEAdvertiser.stopScan()
  .then(result => console.log('Stopped scanning:', result));
```

## Permissões

Certifique-se de que as permissões de Bluetooth estão configuradas no seu app.json:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSBluetoothAlwaysUsageDescription": "Este app usa Bluetooth para anunciar e escanear dispositivos próximos.",
        "NSBluetoothPeripheralUsageDescription": "Este app usa Bluetooth para anunciar e escanear dispositivos próximos."
      }
    },
    "android": {
      "permissions": [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

## Problemas Comuns

1. **Erro de autolink**: Certifique-se de que o plugin está listado no app.json
2. **Permissões**: Verifique se as permissões de Bluetooth estão configuradas
3. **iOS Simulator**: O BLE não funciona no simulador iOS, use um dispositivo físico

## Diferenças do Original

- Adicionado suporte completo ao autolink do Expo
- Configurações específicas para iOS no .podspec
- Plugin personalizado para configuração automática
- Sintaxe moderna do React Native no index.js
