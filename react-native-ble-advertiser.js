// Plugin simples para react-native-ble-advertiser
// Este plugin é executado pelo Expo para configurar a biblioteca

function withBLEAdvertiser(config) {
  // Para bibliotecas nativas, o Expo detecta automaticamente
  // baseado no .podspec file, então não precisamos fazer nada especial
  console.log('✅ Plugin react-native-ble-advertiser carregado');
  return config;
}

module.exports = withBLEAdvertiser;
