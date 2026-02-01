---
layout: doc
title: 記事一覧
---

<script setup>
import { data as articles } from './articles.data'
</script>

# 記事一覧

<div class="article-list">
  <div v-for="article in articles" :key="article.url" class="article-item">
    <a :href="article.url" class="article-link">
      <span class="article-date">{{ article.date }}</span>
    </a>
  </div>
</div>

<style>
.article-list {
  margin-top: 1.5rem;
}

.article-item {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: border-color 0.2s;
}

.article-item:hover {
  border-color: var(--vp-c-brand-1);
}

.article-link {
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 500;
  font-size: 1.1rem;
}

.article-date {
  color: var(--vp-c-brand-1);
}
</style>
