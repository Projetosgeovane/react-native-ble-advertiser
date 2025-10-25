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
            podfileLines.splice(targetIndex + 1, 0, '  pod \'react-native-ble-advertiser\', :path => \'../node_modules/react-native-ble-advertiser\'');
            fs.writeFileSync(podfilePath, podfileLines.join('\n'));
          }
        }
      }

      return config;
    },
  ]);
};

module.exports = withBLEAdvertiser;
