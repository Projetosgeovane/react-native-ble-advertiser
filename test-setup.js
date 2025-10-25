// Script para testar se a configuração está funcionando
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuração do react-native-ble-advertiser...\n');

// Verificar se os arquivos essenciais existem
const filesToCheck = [
  'package.json',
  'index.js',
  'index.d.ts',
  'react-native-ble-advertiser.js',
  'ios/react-native-ble-advertiser.podspec',
  'ios/BLEAdvertiser.h',
  'ios/BLEAdvertiser.m'
];

let allFilesExist = true;

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - OK`);
  } else {
    console.log(`❌ ${file} - FALTANDO`);
    allFilesExist = false;
  }
});

// Verificar package.json
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

  if (packageJson.expo && packageJson.expo.plugins) {
    console.log(`✅ Plugin configurado no package.json: ${packageJson.expo.plugins.join(', ')}`);
  } else {
    console.log('❌ Plugin não configurado no package.json');
    allFilesExist = false;
  }
}

// Verificar podspec
if (fs.existsSync('ios/react-native-ble-advertiser.podspec')) {
  const podspec = fs.readFileSync('ios/react-native-ble-advertiser.podspec', 'utf8');

  if (podspec.includes('React-Core') && podspec.includes('DEFINES_MODULE')) {
    console.log('✅ Podspec configurado corretamente');
  } else {
    console.log('❌ Podspec com configurações incorretas');
    allFilesExist = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('🎉 CONFIGURAÇÃO COMPLETA!');
  console.log('📱 Para testar no seu projeto Expo:');
  console.log('1. npm install react-native-ble-advertiser');
  console.log('2. Adicione "react-native-ble-advertiser" no plugins do app.json');
  console.log('3. npx expo start --clear');
  console.log('4. Teste em dispositivo físico (não simulador)');
} else {
  console.log('⚠️  ALGUMAS CONFIGURAÇÕES ESTÃO FALTANDO');
  console.log('Verifique os arquivos marcados com ❌');
}

console.log('\n💡 Dica: Se der erro, execute:');
console.log('npx expo install --fix');
console.log('npx expo start --clear');
