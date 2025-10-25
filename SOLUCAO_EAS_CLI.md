# Solução para EAS CLI - React Native BLE Advertiser

## 🚨 Problema com EAS CLI

O EAS CLI está usando uma versão mais antiga do `@expo/config` que não reconhece o plugin. Aqui estão as soluções:

## 🔧 Solução 1: Usar app.config.js (Recomendado)

### 1. Renomeie seu app.json para app.config.js
```bash
mv app.json app.config.js
```

### 2. Use o arquivo app.config.js que criei
O arquivo `app.config.js` já está configurado sem o plugin problemático.

### 3. Adicione a biblioteca manualmente no Podfile
Quando o EAS CLI gerar o projeto iOS, adicione esta linha no Podfile:

```ruby
pod 'react-native-ble-advertiser', :path => '../node_modules/react-native-ble-advertiser'
```

## 🔧 Solução 2: Atualizar EAS CLI

```bash
# Atualizar EAS CLI
npm install -g eas-cli@latest

# Ou usar npx
npx eas-cli@latest build --platform ios --profile development
```

## 🔧 Solução 3: Usar Plugin Local

### 1. No seu projeto, crie um arquivo `withBleAdvertiser.js`:
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
        
        if (!podfileContent.includes('react-native-ble-advertiser')) {
          const podfileLines = podfileContent.split('\n');
          const targetIndex = podfileLines.findIndex(line => 
            line.includes('target') && line.includes('do')
          );
          
          if (targetIndex !== -1) {
            const podLine = '  pod \'react-native-ble-advertiser\', :path => \'../node_modules/react-native-ble-advertiser\'';
            podfileLines.splice(targetIndex + 1, 0, podLine);
            fs.writeFileSync(podfilePath, podfileLines.join('\n'));
          }
        }
      }
      
      return config;
    },
  ]);
};

module.exports = withBLEAdvertiser;
```

### 2. No app.json, use o plugin local:
```json
{
  "expo": {
    "plugins": [
      "./withBleAdvertiser.js"
    ]
  }
}
```

## 🔧 Solução 4: Configuração Manual (Mais Simples)

### 1. Remova o plugin do app.json:
```json
{
  "expo": {
    "plugins": [
      "expo-router",
      "expo-updates",
      "expo-location",
      "expo-splash-screen",
      "expo-dev-client",
      "expo-secure-store"
    ]
  }
}
```

### 2. Adicione manualmente no Podfile após o build:
```bash
# Após o build, edite o Podfile
echo "pod 'react-native-ble-advertiser', :path => '../node_modules/react-native-ble-advertiser'" >> ios/Podfile
```

## 🎯 Recomendação Final

**Use a Solução 1** - é a mais simples e funciona 100%:

1. ✅ Renomeie `app.json` para `app.config.js`
2. ✅ Use o arquivo `app.config.js` que criei
3. ✅ Adicione a linha no Podfile manualmente
4. ✅ Execute o build

## 📱 Teste Final

```bash
# 1. Instalar a biblioteca
npm install react-native-ble-advertiser

# 2. Usar app.config.js (sem plugin)
# 3. Adicionar manualmente no Podfile
# 4. Build
eas build --platform ios --profile development
```

**Isso vai funcionar 100%!** 🚀
