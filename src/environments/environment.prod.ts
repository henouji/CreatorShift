export const environment = {
  production: true,
  apiUrl: 'https://api.automation-app.com/api',
  appName: 'Automation',
  version: '1.0.0',
  
  // Feature flags
  features: {
    enableAnalytics: true,
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
    level: 'error',
    enableConsole: false
  }
};
