export const API_CONFIG = {
  // Configuración para desarrollo local
  development: {
    baseUrl: 'http://localhost:8000',
    endpoints: {
      auth: {
        login: '/token/',
        refresh: '/token_refresh/',
      },
      productos: '/productos/',
      carrito: '/item-carrito/',
      register: '/register_user/',
    }
  },
  
  // Configuración para producción (AWS)
  production: {
    baseUrl: 'http://44.207.144.184:8000',
    endpoints: {
      auth: {
        login: '/token/',
        refresh: '/token_refresh/',
      },
      productos: '/productos/',
      carrito: '/item-carrito/',
      register: '/register_user/',
    }
  }
};

// Detecta automáticamente el entorno
export const getCurrentConfig = () => {
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  return isProduction ? API_CONFIG.production : API_CONFIG.development;
};

// Helper functions para construir URLs completas
export const getApiUrl = (endpoint: string) => {
  const config = getCurrentConfig();
  return `${config.baseUrl}${endpoint}`;
};

export const getAuthUrl = (type: 'login' | 'refresh') => {
  const config = getCurrentConfig();
  return `${config.baseUrl}${config.endpoints.auth[type]}`;
};

export const getProductosUrl = () => {
  const config = getCurrentConfig();
  return `${config.baseUrl}${config.endpoints.productos}`;
};

export const getCarritoUrl = () => {
  const config = getCurrentConfig();
  return `${config.baseUrl}${config.endpoints.carrito}`;
};

export const getRegisterUrl = () => {
  const config = getCurrentConfig();
  return `${config.baseUrl}${config.endpoints.register}`;
};
