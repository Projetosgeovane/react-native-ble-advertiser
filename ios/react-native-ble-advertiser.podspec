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

  # Dependências para compatibilidade com Expo
  s.dependency "React-Core"
  s.dependency "React"
  
  # Configurações específicas para Expo
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'SWIFT_OPTIMIZATION_LEVEL' => '-Owholemodule'
  }
  
  # Configuração para autolink do Expo
  s.script_phases = [
    {
      :name => 'Copy Swift Files',
      :script => 'echo "No Swift files to copy"',
      :execution_position => :before_compile
    }
  ]
end
