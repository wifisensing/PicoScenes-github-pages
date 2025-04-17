<template>
  <div class="custom-toc" v-if="headers.length">
    <div class="toc-header">目录</div>
    <ul class="toc-list">
      <li 
        v-for="(header, index) in headers" 
        :key="index" 
        :class="['toc-item', `level-${header.level}`, { 'active': activeLink === `#${header.slug}` }]"
      >
        <a :href="`#${header.slug}`" :title="header.title">{{ header.title }}</a>
      </li>
    </ul>
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

    const resolveHeaders = () => {
      // 只处理 h2 和 h3 标题
      const headersToUse = page.value.headers.filter(header => header.level === 2 || header.level === 3)
      headers.value = headersToUse
    }

    const updateActiveLink = () => {
      if (headers.value.length === 0 || typeof document === 'undefined') return

      // 获取所有标题元素
      const headerLinks = headers.value.map(header => ({
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
    }

    onMounted(() => {
      resolveHeaders()
      
      nextTick(() => {
        updateActiveLink()
        window.addEventListener('scroll', updateActiveLink)
      })
    })

    watch(() => page.value.headers, resolveHeaders)

    // 页面切换时清除滚动监听
    watch(() => page.value.path, () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', updateActiveLink)
        
        nextTick(() => {
          resolveHeaders()
          updateActiveLink()
          window.addEventListener('scroll', updateActiveLink)
        })
      }
    })

    return {
      headers,
      activeLink
    }
  }
}
</script>

<style scoped>
.custom-toc {
  position: fixed;
  right: 2rem;
  top: 10rem;
  width: 16rem;
  max-height: calc(100vh - 15rem);
  overflow-y: auto;
  border-left: 1px solid #eaecef;
  padding-left: 1rem;
  z-index: 0;
}

.toc-header {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.toc-list {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.toc-item {
  padding: 0.25rem 0;
  line-height: 1.5;
}

.toc-item a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s;
}

.toc-item a:hover {
  color: #3eaf7c;
}

.level-2 {
  padding-left: 0;
}

.level-3 {
  padding-left: 1rem;
  font-size: 0.9em;
}

@media (max-width: 1300px) {
  .custom-toc {
    display: none;
  }
}
</style> 