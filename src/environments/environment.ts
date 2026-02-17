export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'Automation',
  version: '1.0.0',
  
  // Feature flags
  features: {
    enableAnalytics: false,
    enableNotifications: true,
    enableDarkMode: true
  },
  
  // Auth configuration
  auth: {
    tokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 3600 // 1 hour
  },
  
  // Logging
  logging: {
    level: 'debug',
    enableConsole: true
  }
};
