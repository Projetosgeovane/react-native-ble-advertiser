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
