/**
 * How to use
 * <el-table height="50px" v-table-resize="{ bottomOffset: 50, observerName: '当前路由组件的名字'}">...</el-table>
 * el-table height is must be set
 * bottomOffset: 50(default)   // The height of the table from the bottom of the page.
 */
 const doResize = (el, binding, vnode) => {
    const { componentInstance: $table } = vnode
    const { value } = binding
    let bottomOffset = 50
    if (value && (value.bottomOffset || Number(value.bottomOffset) === 0)) {
        bottomOffset = value.bottomOffset
    }
    if (!$table) return
    const height = window.innerHeight - el.getBoundingClientRect().top - bottomOffset
    $table.resizeHeight = el.getBoundingClientRect().top
    let timer = setTimeout(() => {
      $table.layout.setHeight(height)
      $table.doLayout()
      clearTimeout(timer)
    }, 4)
  }
  
  export default {
    bind (el, binding, vnode) {
      const { componentInstance: $table } = vnode
      if (!binding.value || !binding.value.observerName) {
        throw new Error('observerName is must be the 当前路由组件的名字 name')
      }
      if (!$table.height) {
        throw new Error(`el-$table must set the height. Such as height='100px'`)
      }
      el.resizeListener = () => {
        doResize(el, binding, vnode)
      }
      // 监听dom节点出现
      const intersectionObserver = new IntersectionObserver(function (entries) {
        if (entries[0].intersectionRatio <= 0) return;
        el.resizeListener()
      });
      intersectionObserver.observe(el);
      window.addEventListener('resize', el.resizeListener)
    },
    inserted (el, binding, vnode) {
      if (binding.value && binding.value.observerName) {
        let node = vnode.componentInstance
        while (node.$options.name !== binding.value.observerName) {
          node = node.$options.parent
        }
        // 观察器的配置（需要观察什么变动）
        const config = { attributes: true, childList: true, subtree: true };
  
        // 当观察到变动时执行的回调函数
        const callback = function () {
          // Use traditional 'for loops' for IE 11
          if (vnode.componentInstance.resizeHeight !== el.getBoundingClientRect().top) {
            doResize(el, binding, vnode)
          }
        };
        const observer = new MutationObserver(callback);
        observer.observe(node.$el, config);
      }
      doResize(el, binding, vnode)
      // 选择需要观察变动的节点
    },
    unbind (el) {
      window.removeEventListener('resize', el.resizeListener)
    }
  }