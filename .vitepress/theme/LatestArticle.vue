<script setup lang="ts">
import { data as articles } from '../../articles/articles.data'
import { computed } from 'vue'

const latestArticle = computed(() => {
  return articles[0] || null
})
</script>

<template>
  <div class="latest-article" v-if="latestArticle">
    <div class="article-header">
      <h1>{{ latestArticle.date }}</h1>
    </div>
    <div class="article-content" v-html="latestArticle.html"></div>
  </div>
  <div v-else class="no-article">
    <p>記事がまだありません。</p>
  </div>
</template>

<style scoped>
.latest-article {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.date-badge {
  background: var(--vp-c-brand-1);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
}

.view-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 0.9rem;
}

.view-link:hover {
  text-decoration: underline;
}

.article-content {
  line-height: 1.7;
}

.article-content :deep(h1) {
  display: none; /* タイトルはすでにヘッダーで表示 */
}

.article-content :deep(h2) {
  margin-top: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.no-article {
  text-align: center;
  padding: 2rem;
  color: var(--vp-c-text-2);
}
</style>
