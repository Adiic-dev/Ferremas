
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
    'index.csr.html': {size: 23671, hash: '941fc45e35ba843e5d98c3f1edf87947047e130653d225c93eff0ca39eb23422', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17077, hash: '12cd9c27bba73e04d9e93f710cc9a70fed1abd115e239a656a69bff051769624', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 28992, hash: 'a87747f4f3532e194d57416d12c993df99b61b49b56d6243dff936076f96c83f', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 28992, hash: 'a87747f4f3532e194d57416d12c993df99b61b49b56d6243dff936076f96c83f', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'carrito/index.html': {size: 28992, hash: 'a87747f4f3532e194d57416d12c993df99b61b49b56d6243dff936076f96c83f', text: () => import('./assets-chunks/carrito_index_html.mjs').then(m => m.default)},
    'registro/index.html': {size: 31094, hash: '6871fe6d57e9d8839aafbd447fed7e432302d0a7c0694662b4c1f11c9b9ce909', text: () => import('./assets-chunks/registro_index_html.mjs').then(m => m.default)},
    'crud/index.html': {size: 28992, hash: 'a87747f4f3532e194d57416d12c993df99b61b49b56d6243dff936076f96c83f', text: () => import('./assets-chunks/crud_index_html.mjs').then(m => m.default)},
    'styles-URF4TVC7.css': {size: 7147, hash: 'keGu+H2ZGCI', text: () => import('./assets-chunks/styles-URF4TVC7_css.mjs').then(m => m.default)}
  },
};
