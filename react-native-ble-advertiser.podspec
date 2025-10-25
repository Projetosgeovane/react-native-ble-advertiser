Pod::Spec.new do |s|
  s.name         = "react-native-ble-advertiser"
  s.version      = "0.0.17"
  s.summary      = "A react-native implementation for sending BLE advertisements"
  s.authors      = { "Fork" => "email@example.com" }
  s.homepage     = "https://github.com/Projetosgeovane/react-native-ble-advertiser"
  s.license      = "MIT"

  s.platforms    = { :ios => "11.0" }
  s.source       = { :path => "." }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React-Core"

  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/React-Core/React\"",
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++20",
    "DEFINES_MODULE" => "YES"
  }
end
