// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import '@hotwired/turbo-rails'
import 'alpine-turbo-drive-adapter'
import Alpine from 'alpinejs'
import "./controllers"
window.Alpine = Alpine
Alpine.start()

// 禁用 turbo
// import { Turbo } from "@hotwired/turbo-rails"
// Turbo.session.drive = false