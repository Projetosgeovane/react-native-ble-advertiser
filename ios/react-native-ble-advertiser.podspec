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
  
  # Usar arquivos locais em vez de Git
  s.source       = { :path => "." }

  # Caminho correto para os arquivos fonte
  s.source_files = "*.{h,m,mm,swift}"
  s.requires_arc = true

  # Dependências corretas para React Native 0.81.5
  s.dependency "React-Core"
  
  # Configurações para compatibilidade com Expo
  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/React-Core/React\"",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++20",
    "DEFINES_MODULE" => "YES"
  }
end