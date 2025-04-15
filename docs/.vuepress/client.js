import { defineClientConfig } from '@vuepress/client'
import { h, onMounted, watch } from 'vue'
import { usePageData, useRouter } from '@vuepress/client'

const NumberingSetter = {
  setup() {
    const page = usePageData()
    const router = useRouter()
    
    const updateNumbering = () => {
      if (typeof document === 'undefined') return
      
      // 使用setTimeout确保DOM已经更新
      setTimeout(() => {
        const main = document.querySelector('.theme-default-content') || document.querySelector('main')
        if (!main) return
        
        const autoNumbering = page.value.frontmatter.autoNumbering
        
        if (autoNumbering === true) {
          // console.log('启用自动编号:', window.location.pathname)
          main.setAttribute('data-numbering', '1')
          
          const startNumber = page.value.frontmatter.startNumber || 1
          // console.log('起始编号:', startNumber)
          main.style.setProperty('--start-number', String(startNumber - 1))
        } else {
          // console.log('禁用自动编号:', window.location.pathname)
          main.setAttribute('data-numbering', '0')
        }
      }, 100)
    }
    
    // 监视页面数据变化
    watch(() => page.value.path, updateNumbering, { immediate: true })
    
    // 组件挂载时更新编号
    onMounted(() => {
      updateNumbering()
      
      // 监听路由变化
      router.afterEach(() => {
        updateNumbering()
      })
    })
    
    return () => h('div', { style: { display: 'none' } })
  }
}

export default defineClientConfig({
  enhance({ app }) {
    app.component('NumberingSetter', NumberingSetter)
  },
  rootComponents: [NumberingSetter]
})