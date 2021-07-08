import adaptive from './lib/adaptive'

const install = function (Vue) {
  Vue.directive('table-resize', adaptive)
}

if (window.Vue) {
  window['table-resize'] = adaptive
  Vue.use(install); // eslint-disable-line
}

adaptive.install = install
export default adaptive
