<template>
  <div class="custom-toc" v-if="headers.length">
    <div class="toc-header">目录</div>
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
    const allHeaders = ref([]) // 存储展平后的所有标题

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

.sub-list {
  list-style: none;
  padding-left: 1rem;
  margin: 0.25rem 0 0.5rem;
}

.toc-item {
  padding: 0.25rem 0;
  line-height: 1.5;
}

.level-2 {
  padding-left: 0;
}

.level-3 {
  font-size: 0.9em;
}

.toc-item a {
  color: #2c3e50;
  text-decoration: none;
  transition: color 0.3s;
}

.toc-item a:hover,
.toc-item.active > a {
  color: #3eaf7c;
  font-weight: 600;
}

@media (max-width: 1300px) {
  .custom-toc {
    display: none;
  }
}
</style> 