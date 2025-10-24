require 'json'

package = JSON.parse(File.read(File.join(__dir__, '../package.json')))

Pod::Spec.new do |s|
  s.name         = package['name']
  s.version      = package['version']
  s.summary      = package['description']
  s.authors      = package['author']
  s.homepage     = package['homepage']
  s.license      = package['license']

  s.platforms    = { :ios => "11.0" }
  s.source       = { :git => "https://github.com/vitorpamplona/react-native-ble-advertiser.git", :tag => "#{s.version}" }

  # Corrigido para pegar tudo dentro da pasta ios/
  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  # Atualizado para React moderno
  s.dependency "React-Core"
end
