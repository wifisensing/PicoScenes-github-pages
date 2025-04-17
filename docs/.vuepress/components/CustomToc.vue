<template>
  <div class="custom-toc" v-if="headers.length">
    <div class="toc-header">
      <span>Current page content</span>
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
import { usePageData, usePageFrontmatter } from '@vuepress/client'

export default {
  name: 'CustomToc',
  setup() {
    const page = usePageData()
    const frontmatter = usePageFrontmatter()
    const headers = ref([])
    const activeLink = ref('')
    const prevActiveLink = ref('')
    const allHeaders = ref([]) // 存储展平后的所有标题
    let scrollDebounceTimer = null
    let resizeDebounceTimer = null
    let tocScrollTimer = null // 用于目录内部滚动

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

    // 滚动目录项到视图中央
    const scrollActiveItemToCenter = () => {
      if (typeof document === 'undefined' || !activeLink.value || activeLink.value === prevActiveLink.value) return
      
      prevActiveLink.value = activeLink.value
      
      // 等待DOM更新完成
      nextTick(() => {
        const activeItem = document.querySelector(`.toc-item a[href="${activeLink.value}"]`)
        const tocContainer = document.querySelector('.toc-container')
        
        if (!activeItem || !tocContainer) return
        
        const activeItemElement = activeItem.closest('.toc-item')
        if (!activeItemElement) return

        const containerHeight = tocContainer.clientHeight
        const itemTop = activeItemElement.offsetTop
        const itemHeight = activeItemElement.clientHeight
        const scrollTarget = itemTop - (containerHeight / 2) + (itemHeight / 2)
        
        // 清除旧的定时器
        if(tocScrollTimer) clearTimeout(tocScrollTimer)
        
        // 使用平滑滚动，但给一个稍长的时间
        tocContainer.scrollTo({
          top: Math.max(0, scrollTarget),
          behavior: 'smooth'
        })
      })
    }

    // 更新激活链接（由滚动或页面加载触发）
    const updateActiveLink = () => {
      if (allHeaders.value.length === 0 || typeof document === 'undefined') return

      const topOffset = 80 // 距离视口顶部的偏移量
      let currentActiveSlug = ''

      // 倒序遍历标题，找到最后一个满足条件的
      for (let i = allHeaders.value.length - 1; i >= 0; i--) {
        const header = allHeaders.value[i]
        const element = document.getElementById(header.slug)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= topOffset) {
            currentActiveSlug = header.slug
            break // 找到第一个顶部在偏移量之上的元素
          }
        }
      }
      
      // 如果没有找到满足条件的（例如页面顶部），则尝试取第一个标题
      if (!currentActiveSlug && allHeaders.value.length > 0) {
         const firstHeader = allHeaders.value[0]
         const firstElement = document.getElementById(firstHeader.slug)
         // 确保第一个元素实际存在且可见（或部分可见）
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
      scrollDebounceTimer = setTimeout(updateActiveLink, 150) // 稍微增加延迟
    }
    
    // 调整大小事件防抖处理
    const debouncedResizeHandler = () => {
       // 调整大小时可能需要重新计算TOC的位置（如果不是纯fixed）
       // 在fixed定位下，这个可能不需要，但保留以防万一
    }
    
    // 打印当前页面
    const printPage = () => {
      if (typeof window !== 'undefined') window.print()
    }
    
    // 初始化或页面切换后的处理
    const initializeToc = () => {
       resolveHeaders()
       // 延迟执行，等待页面渲染和可能的锚点跳转完成
       setTimeout(() => {
         if (typeof window !== 'undefined' && window.location.hash) {
           activeLink.value = window.location.hash
         } else {
           updateActiveLink() // 根据当前滚动位置设置
         }
         // 滚动目录到激活项
         setTimeout(scrollActiveItemToCenter, 100) 
       }, 300) // 增加延迟确保浏览器滚动完成
    }

    onMounted(() => {
      initializeToc()
      window.addEventListener('scroll', debouncedScrollHandler)
      window.addEventListener('resize', debouncedResizeHandler)
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', debouncedScrollHandler)
      window.removeEventListener('resize', debouncedResizeHandler)
      if (scrollDebounceTimer) clearTimeout(scrollDebounceTimer)
      if (resizeDebounceTimer) clearTimeout(resizeDebounceTimer)
      if (tocScrollTimer) clearTimeout(tocScrollTimer)
    })

    // 监听路由变化
    watch(() => page.value.path, () => {
      // 移除旧监听器
      window.removeEventListener('scroll', debouncedScrollHandler)
      window.removeEventListener('resize', debouncedResizeHandler)
      prevActiveLink.value = ''
      activeLink.value = '' // 重置激活链接
      // 重新初始化
      initializeToc()
      // 重新添加监听器
      window.addEventListener('scroll', debouncedScrollHandler)
      window.addEventListener('resize', debouncedResizeHandler)
    })

    // 监听activeLink变化，滚动目录
    watch(activeLink, scrollActiveItemToCenter)

    return {
      headers,
      activeLink,
      printPage,
      // 不再需要导出 handleTocClick，使用默认锚点行为
    }
  }
}
</script>

<style scoped>
.custom-toc {
  position: fixed;
  /* 定位到内容区域右侧，考虑内容最大宽度和视口宽度 */
  right: max(var(--toc-right-margin), calc((100vw - var(--content-max-width)) / 2 - var(--toc-width) - var(--sidebar-width, 0rem)));
  top: 6rem;
  width: var(--toc-width);
  max-height: calc(100vh - 12rem);
  border: none;
  border-radius: 0;
  background-color: transparent;
  box-shadow: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, border-color 0.3s;
  padding-left: 0.5rem;
  border-left: 1px solid var(--c-border);
}

.toc-header {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.7rem 1rem 0.7rem 0.5rem;
  background-color: transparent;
  border-bottom: 1px solid var(--c-border);
  position: sticky; /* Header内部sticky是好的 */
  top: 0; /* 相对于.custom-toc顶部 */
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
  padding-left: 1.2rem;
  margin: 0.25rem 0 0.5rem;
  border-left: 1px solid var(--c-border);
  transition: border-color 0.3s;
}

.toc-item {
  padding: 0.25rem 0;
  line-height: 1.5;
}

.level-2 {
  font-weight: 500;
  margin-top: 0.3rem;
}

.level-3 {
  font-size: 0.95em;
}

.toc-item a {
  color: var(--c-text-lighter);
  text-decoration: none;
  transition: color 0.3s;
  display: inline-block;
}

.toc-item a:hover,
.toc-item.active > a {
  color: var(--c-brand);
  font-weight: 600;
}

.toc-item.active {
  position: relative;
}

.toc-item.active::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 1em;
  background-color: var(--c-brand);
  border-radius: 0 2px 2px 0;
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