<template>
  <div class="custom-toc" v-if="headers.length" :style="{ left: tocLeft }">
    <div class="toc-header">
      <span>On this page</span>
      <button class="print-button" @click="printPage" title="打印页面">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
      </button>
    </div>
    <div class="toc-container">
      <ul class="toc-list">
        <li 
          v-for="header in headers" 
          :key="header.slug"
          class="toc-item level-2"
          :class="{ 'active': activeLink === `#${header.slug}` }"
        >
          <a :href="`#${header.slug}`" :title="header.title">{{ header.title }}</a>
          <!-- 显示三级子标题 -->
          <ul v-if="header.children && header.children.length" class="sub-list">
            <li 
              v-for="child in header.children" 
              :key="child.slug"
              class="toc-item level-3"
              :class="{ 'active': activeLink === `#${child.slug}` }"
            >
              <a :href="`#${child.slug}`" :title="child.title">{{ child.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'
import { usePageData } from '@vuepress/client'

export default {
  name: 'CustomToc',
  setup() {
    const page = usePageData()
    const headers = ref([])
    const activeLink = ref('')
    const prevActiveLink = ref('')
    const allHeaders = ref([])
    let scrollDebounceTimer = null
    let resizeDebounceTimer = null
    let tocScrollTimer = null
    const tocElement = ref(null) // 引用TOC DOM元素
    let resizeObserver = null
    const tocLeft = ref('-9999px') // 用于动态绑定 left 样式
    const tocGap = 16 // 目录与内容区的间距 (px)

    const resolveHeaders = () => {
      headers.value = page.value.headers
      const flattened = []
      headers.value.forEach(h => {
        flattened.push(h)
        if (h.children && h.children.length) {
          h.children.forEach(child => flattened.push(child))
        }
      })
      allHeaders.value = flattened
    }

    // 更新TOC的left定位
    const updateTocPosition = () => {
      if (typeof document === 'undefined' || !tocElement.value) return // 确保TOC元素存在
      
      // 尝试更可靠的选择器
      const mainContent = document.querySelector('.vp-page .vp-doc') || // VuePress Default Theme (Vite)
                           document.querySelector('.theme-hope-content') || 
                           document.querySelector('.theme-default-content') || 
                           document.querySelector('main')
      
      console.log('TOC Debug: Main content element found:', mainContent)
      if (!mainContent) return
      
      const contentRect = mainContent.getBoundingClientRect()
      const tocWidth = tocElement.value.offsetWidth // 使用 offsetWidth 获取实际宽度
      const newLeft = contentRect.right + tocGap
      
      console.log(`TOC Debug: Content right: ${contentRect.right}, Toc Gap: ${tocGap}, Calculated Left: ${newLeft}, Toc Width: ${tocWidth}, Window Width: ${window.innerWidth}`) 
      
      // 检查计算结果是否合理
      if (newLeft > 0 && newLeft + tocWidth < window.innerWidth + 50) { // 加一点容错空间
         tocLeft.value = `${newLeft}px`
         console.log(`TOC Debug: Setting left to ${tocLeft.value}`) 
      } else {
         // 如果计算出的位置不合理（例如内容区太宽或未找到），尝试一个备用定位
         // 例如，固定在视口右侧减去自身宽度和一些边距
         const fallbackLeft = window.innerWidth - tocWidth - tocGap * 2
         tocLeft.value = `${fallbackLeft}px`
         console.log(`TOC Debug: Calculated left unreasonable, using fallback: ${tocLeft.value}`) 
      }
    }

    // 滚动目录项到视图中央
    const scrollActiveItemToCenter = () => {
      if (typeof document === 'undefined' || !activeLink.value || activeLink.value === prevActiveLink.value) return
      
      prevActiveLink.value = activeLink.value
      
      nextTick(() => {
        if (!tocElement.value) return
        const tocContainer = tocElement.value.querySelector('.toc-container')
        const activeItemAnchor = tocContainer?.querySelector(`.toc-item a[href="${activeLink.value}"]`)
        const activeItemElement = activeItemAnchor?.closest('.toc-item')

        if (!activeItemElement || !tocContainer) return

        const containerHeight = tocContainer.clientHeight
        const itemTop = activeItemElement.offsetTop
        const itemHeight = activeItemElement.clientHeight
        const scrollTarget = itemTop - (containerHeight / 2) + (itemHeight / 2)
        
        if(tocScrollTimer) clearTimeout(tocScrollTimer)
        
        tocContainer.scrollTo({
          top: Math.max(0, scrollTarget),
          behavior: 'smooth'
        })
      })
    }

    // 更新激活链接
    const updateActiveLink = () => {
      if (allHeaders.value.length === 0 || typeof document === 'undefined') return
      const topOffset = 80
      let currentActiveSlug = ''
      for (let i = allHeaders.value.length - 1; i >= 0; i--) {
        const header = allHeaders.value[i]
        const element = document.getElementById(header.slug)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= topOffset) {
            currentActiveSlug = header.slug
            break
          }
        }
      }
      if (!currentActiveSlug && allHeaders.value.length > 0) {
         const firstHeader = allHeaders.value[0]
         const firstElement = document.getElementById(firstHeader.slug)
         if (firstElement && firstElement.getBoundingClientRect().top < window.innerHeight) {
             currentActiveSlug = firstHeader.slug
         }
      }
      const newActiveLink = `#${currentActiveSlug}`
      if (newActiveLink !== '#' && newActiveLink !== activeLink.value) {
        activeLink.value = newActiveLink
      }
    }

    // 滚动事件防抖处理
    const debouncedScrollHandler = () => {
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer)
      scrollDebounceTimer = setTimeout(updateActiveLink, 150)
    }
    
    // ResizeObserver 回调防抖
    const debouncedPositionUpdate = () => {
       if (resizeDebounceTimer) clearTimeout(resizeDebounceTimer);
       resizeDebounceTimer = setTimeout(updateTocPosition, 100);
    }
    
    // 打印当前页面
    const printPage = () => {
      if (typeof window !== 'undefined') window.print()
    }
    
    // 初始化或页面切换后的处理
    const initializeToc = () => {
       resolveHeaders()
       nextTick(() => {
         // 确保TOC元素已挂载
         tocElement.value = document.querySelector('.custom-toc'); // 在 nextTick 后获取引用
         console.log('TOC Debug: tocElement ref assigned:', tocElement.value)
         if (tocElement.value) {
           // 增加延迟确保布局稳定
           setTimeout(() => {
             updateTocPosition() // 首次定位
             // 初始化激活链接和滚动
             setTimeout(() => {
               if (typeof window !== 'undefined' && window.location.hash) {
                 activeLink.value = window.location.hash
               } else {
                 updateActiveLink()
               }
               setTimeout(scrollActiveItemToCenter, 100) 
             }, 100)
           }, 200) // 增加首次定位的延迟
         }
       })
    }

    onMounted(() => {
      initializeToc()
      window.addEventListener('scroll', debouncedScrollHandler)
      
      // 使用 ResizeObserver 监听内容区域或body大小变化
      if (typeof window !== 'undefined' && typeof ResizeObserver !== 'undefined') {
        const targetElement = document.querySelector('.vp-page .vp-doc') || // 优先监听主要内容区
                              document.querySelector('.theme-hope-content') || 
                              document.querySelector('.theme-default-content') || 
                              document.body // 最后回退到 body
        console.log('TOC Debug: ResizeObserver target:', targetElement)
        if (targetElement) {
           resizeObserver = new ResizeObserver(debouncedPositionUpdate);
           resizeObserver.observe(targetElement);
        } else {
           console.log('TOC Debug: No target found for ResizeObserver, falling back to window resize')
           window.addEventListener('resize', debouncedPositionUpdate); 
        }
      } else {
         console.log('TOC Debug: ResizeObserver not supported, falling back to window resize')
         window.addEventListener('resize', debouncedPositionUpdate);
      }
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', debouncedScrollHandler)
      window.removeEventListener('resize', debouncedPositionUpdate) // 移除 debounced handler
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer)
      if (resizeDebounceTimer) clearTimeout(resizeDebounceTimer)
      if (tocScrollTimer) clearTimeout(tocScrollTimer)
    })

    // 监听路由变化
    watch(() => page.value.path, () => {
      // 清理旧的监听器和状态
      window.removeEventListener('scroll', debouncedScrollHandler)
      window.removeEventListener('resize', debouncedPositionUpdate)
      if (resizeObserver) resizeObserver.disconnect();
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer)
      if (resizeDebounceTimer) clearTimeout(resizeDebounceTimer)
      if (tocScrollTimer) clearTimeout(tocScrollTimer)
      activeLink.value = ''
      prevActiveLink.value = ''
      tocLeft.value = '-9999px' // 切换时先隐藏
      
      // 重新初始化，JS会处理定位和激活链接
      initializeToc()
      // 重新添加监听器
      window.addEventListener('scroll', debouncedScrollHandler)
      // ResizeObserver 会在 initializeToc -> onMounted 逻辑中重新设置
      // 但需要确保旧的 observer 被 disconnect
      // Fallback for resize listener needs re-adding if Observer fails/not supported
      if (typeof ResizeObserver === 'undefined' || !document.querySelector(/* target selector */)) {
         window.addEventListener('resize', debouncedPositionUpdate);
      }
    })

    // 监听activeLink变化，滚动目录
    watch(activeLink, scrollActiveItemToCenter)

    return {
      headers,
      activeLink,
      printPage,
      tocLeft // 暴露给模板绑定样式
    }
  }
}
</script>

<style scoped>
.custom-toc {
  position: fixed;
  /* top 定位保持 */
  top: 6rem;
  /* left 值将由 JS 动态设置 */
  left: -9999px; /* 初始隐藏在屏幕外，防止闪烁 */
  width: var(--toc-width);
  max-height: calc(100vh - 12rem);
  border: none;
  border-radius: 0;
  background-color: transparent;
  box-shadow: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, border-color 0.3s, left 0.1s ease-out; /* 添加 left 过渡 */
  padding-left: 0.5rem;
  border-left: 1px solid var(--c-border);
}

.toc-header {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.7rem 0.5rem 0.7rem 0.5rem; /* 减小右内边距 */
  background-color: transparent;
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 0; /* 相对于 .custom-toc 顶部 */
  z-index: 2;
  color: var(--c-text);
  transition: color 0.3s, border-color 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.print-button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.2rem;
  color: var(--c-text-lighter);
  border-radius: 4px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s, background-color 0.3s;
  margin-left: 0.5rem; /* 在按钮左侧添加一些外边距 */
}

.print-button:hover {
  color: var(--c-brand);
  background-color: var(--c-bg-lighter);
}

.print-button:focus {
  outline: none;
}

.print-button svg {
  width: 16px;
  height: 16px;
}

.toc-container {
  padding: 0.5rem 0;
  background-color: transparent;
  overflow-y: auto;
  /* 减去header的高度 */
  max-height: calc(100% - 3rem);
  scrollbar-width: thin;
  scrollbar-color: var(--c-border) transparent;
}

.toc-container::-webkit-scrollbar {
  width: 4px;
}

.toc-container::-webkit-scrollbar-track {
  background: transparent;
}

.toc-container::-webkit-scrollbar-thumb {
  background-color: var(--c-border);
  border-radius: 4px;
}

.toc-list {
  list-style: none;
  padding: 0 1rem 0 0.5rem;
  margin: 0;
}

.sub-list {
  list-style: none;
  padding-left: 1rem;
  margin: 0.15rem 0 0.3rem;
  border-left: 1px solid var(--c-border);
  transition: border-color 0.3s;
}

.toc-item {
  padding: 0.1rem 0; /* 保持紧凑 */
  line-height: 1.4;
}

.level-2 {
  font-weight: 500;
  margin-top: 0.3rem;
}

.level-3 {
  font-size: 0.9em;
}

.toc-item a {
  color: var(--c-text-lighter);
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s; /* 优化过渡 */
  display: block; /* 改为块级 */
  padding: 0.2rem 0.6rem; /* 添加内边距 */
  margin-left: -0.6rem; /* 补偿左内边距 */
  border-radius: 4px; /* 添加圆角 */
}

/* 悬停和激活状态 */
.toc-item a:hover,
.toc-item.active > a {
  color: var(--c-brand); 
  background-color: var(--vp-c-accent-soft, var(--c-brand-light)); /* 使用变量并提供回退 */
  /* font-weight: 600; */ /* 可以取消注释以加粗 */
  text-decoration: none; 
}

/* active 状态的容器，保持相对定位给可能的伪元素 */
.toc-item.active {
  position: relative;
}

/* 打印样式 */
@media print {
  .custom-toc {
    display: none;
  }
}

@media (max-width: 1300px) {
  .custom-toc {
    display: none;
  }
}
</style> 