
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
    'index.csr.html': {size: 23671, hash: '43f4bcc916ed75bc5eede2aef85ac923d8eacc6bd59c171acc1f40ddd10cac67', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17077, hash: 'edb30d1eca9b23e66c2b134a5d036771646cc8b9106835e55b4bcd10a8a23901', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 28992, hash: 'c0ab33150ed84db587dd4280996d20771a8ac6f7f26802c7498ab2f979da93d1', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 28992, hash: 'c0ab33150ed84db587dd4280996d20771a8ac6f7f26802c7498ab2f979da93d1', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'carrito/index.html': {size: 28992, hash: 'c0ab33150ed84db587dd4280996d20771a8ac6f7f26802c7498ab2f979da93d1', text: () => import('./assets-chunks/carrito_index_html.mjs').then(m => m.default)},
    'registro/index.html': {size: 31094, hash: '8eaea25985af8d1a1e09d7d21aad31190a87d5fed00989023abdf0c16432b047', text: () => import('./assets-chunks/registro_index_html.mjs').then(m => m.default)},
    'crud/index.html': {size: 28992, hash: 'c0ab33150ed84db587dd4280996d20771a8ac6f7f26802c7498ab2f979da93d1', text: () => import('./assets-chunks/crud_index_html.mjs').then(m => m.default)},
    'styles-URF4TVC7.css': {size: 7147, hash: 'keGu+H2ZGCI', text: () => import('./assets-chunks/styles-URF4TVC7_css.mjs').then(m => m.default)}
  },
};
