
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/home",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/registro"
  },
  {
    "renderMode": 2,
    "route": "/crud"
  },
  {
    "renderMode": 2,
    "route": "/carrito"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23671, hash: '5afbeb144d7ef44d072b23cc65b6e62cc853a83fe724a771acf841e506bdbf76', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17077, hash: 'd60beb7e2080cc6bbb0240b9cd84e1e7d00df12dd67d2689823c4fd2f7a75de9', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'carrito/index.html': {size: 28992, hash: 'b4190006d70b24434e01fffef6657b792c6d2aa77082d63034eb1bd340b9fc8b', text: () => import('./assets-chunks/carrito_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 28992, hash: 'b4190006d70b24434e01fffef6657b792c6d2aa77082d63034eb1bd340b9fc8b', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 28992, hash: 'b4190006d70b24434e01fffef6657b792c6d2aa77082d63034eb1bd340b9fc8b', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'crud/index.html': {size: 28992, hash: 'b4190006d70b24434e01fffef6657b792c6d2aa77082d63034eb1bd340b9fc8b', text: () => import('./assets-chunks/crud_index_html.mjs').then(m => m.default)},
    'registro/index.html': {size: 31094, hash: 'ebc4adfa02cb61372abd287570db7959987a72900c0b6cc1bb18ed3b5a7cba52', text: () => import('./assets-chunks/registro_index_html.mjs').then(m => m.default)},
    'styles-URF4TVC7.css': {size: 7147, hash: 'keGu+H2ZGCI', text: () => import('./assets-chunks/styles-URF4TVC7_css.mjs').then(m => m.default)}
  },
};
