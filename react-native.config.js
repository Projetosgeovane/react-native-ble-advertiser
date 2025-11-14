module.exports = {
  dependencies: {
    'react-native-ble-advertiser': {
      platforms: {
        android: {
          "packageImportPath": "import com.vitorpamplona.bleavertiser;",
          "packageInstance": "new BLEAdvertiserPackage()"
        },
        ios: {
          // Configuração para iOS - o autolink do Expo detecta automaticamente
          // baseado no .podspec file
        }
      }
    }
  }
};