<template>
  <div class="custom-toc" v-if="headers.length">
    <div class="toc-header">目录</div>
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
import { ref, onMounted, watch, nextTick } from 'vue'
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
    const mainContentWidth = ref(0)

    const resolveHeaders = () => {
      // 获取所有二级标题
      headers.value = page.value.headers
      
      // 将所有标题(包括子标题)展平为一个数组，用于滚动监听
      const flattened = []
      headers.value.forEach(h => {
        flattened.push(h)
        if (h.children && h.children.length) {
          h.children.forEach(child => flattened.push(child))
        }
      })
      allHeaders.value = flattened
      
      console.log('标题结构:', headers.value)
      console.log('展平的所有标题:', allHeaders.value)
    }

    // 滚动活动项到视图中央
    const scrollActiveItemToCenter = () => {
      if (typeof document === 'undefined' || !activeLink.value || activeLink.value === prevActiveLink.value) return
      
      prevActiveLink.value = activeLink.value
      
      // 等待DOM更新完成
      nextTick(() => {
        const activeLinkId = activeLink.value.slice(1) // 移除#前缀
        const activeItem = document.querySelector(`.toc-item.active`)
        const tocContainer = document.querySelector('.toc-container')
        
        if (!activeItem || !tocContainer) return
        
        // 计算目标滚动位置 - 将活动项居中
        const containerHeight = tocContainer.clientHeight
        const itemTop = activeItem.offsetTop
        const itemHeight = activeItem.clientHeight
        
        // 目标位置是项目顶部减去容器一半高度，再加上项目一半高度
        const scrollTarget = itemTop - (containerHeight / 2) + (itemHeight / 2)
        
        // 平滑滚动到目标位置
        tocContainer.scrollTo({
          top: Math.max(0, scrollTarget),
          behavior: 'smooth'
        })
      })
    }

    const updateActiveLink = () => {
      if (allHeaders.value.length === 0 || typeof document === 'undefined') return

      // 获取所有标题元素
      const headerLinks = allHeaders.value.map(header => ({
        id: header.slug,
        top: document.getElementById(header.slug)?.getBoundingClientRect().top || 0
      }))

      // 找到第一个在视口顶部以下的标题
      const currentHeaderLink = headerLinks
        .filter(link => link.top > 80)
        .sort((a, b) => a.top - b.top)[0]

      // 如果找不到在视口内的标题，则使用第一个标题
      if (currentHeaderLink) {
        activeLink.value = `#${currentHeaderLink.id}`
      } else if (headerLinks.length > 0) {
        // 如果所有标题都在视口顶部以上，则选择最后一个标题
        const lastLink = headerLinks.sort((a, b) => b.top - a.top)[0]
        activeLink.value = `#${lastLink.id}`
      }
      
      // 滚动目录使活动项居中
      scrollActiveItemToCenter()
    }

    // 定位目录到内容区域右侧
    const positionToc = () => {
      if (typeof document === 'undefined') return
      
      // 查找主内容区域元素
      const mainContent = document.querySelector('.theme-hope-content') || 
                           document.querySelector('.theme-default-content') || 
                           document.querySelector('main')
      
      if (!mainContent) return
      
      // 获取主内容区域的宽度和右侧位置
      const contentRect = mainContent.getBoundingClientRect()
      mainContentWidth.value = contentRect.width
    }

    onMounted(() => {
      resolveHeaders()
      
      nextTick(() => {
        updateActiveLink()
        positionToc()
        window.addEventListener('scroll', updateActiveLink)
        window.addEventListener('resize', positionToc)
      })
    })

    watch(() => page.value.headers, resolveHeaders)

    // 页面切换时清除滚动监听
    watch(() => page.value.path, () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', updateActiveLink)
        window.removeEventListener('resize', positionToc)
        
        nextTick(() => {
          resolveHeaders()
          prevActiveLink.value = '' // 重置上一个活动链接
          updateActiveLink()
          positionToc()
          window.addEventListener('scroll', updateActiveLink)
          window.addEventListener('resize', positionToc)
        })
      }
    })

    // 监听activeLink变化
    watch(() => activeLink.value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        scrollActiveItemToCenter()
      }
    })

    return {
      headers,
      activeLink,
      mainContentWidth
    }
  }
}
</script>

<style scoped>
.custom-toc {
  position: sticky;
  top: 6rem;
  float: right;
  margin-right: -20rem;
  width: 16rem;
  max-height: calc(100vh - 12rem);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background-color: var(--c-bg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, border-color 0.3s;
}

.toc-header {
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.7rem 1rem;
  background-color: var(--c-bg-lighter);
  border-bottom: 1px solid var(--c-border);
  position: sticky;
  top: 6rem;
  z-index: 2;
  color: var(--c-text);
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.toc-container {
  padding: 0.5rem 0;
  background-color: var(--c-bg);
  overflow-y: auto;
  max-height: calc(100vh - 15rem);
  scrollbar-width: thin;
  scrollbar-color: var(--c-border) transparent;
  scroll-behavior: smooth;
  transition: background-color 0.3s;
}

.toc-container::-webkit-scrollbar {
  width: 5px;
}

.toc-container::-webkit-scrollbar-track {
  background: transparent;
}

.toc-container::-webkit-scrollbar-thumb {
  background-color: var(--c-border);
  border-radius: 3px;
}

.toc-list {
  list-style: none;
  padding: 0 1rem;
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
  color: var(--c-text);
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
  left: -1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 1em;
  background-color: var(--c-brand);
  border-radius: 0 2px 2px 0;
}

@media (max-width: 1300px) {
  .custom-toc {
    display: none;
  }
}
</style> 