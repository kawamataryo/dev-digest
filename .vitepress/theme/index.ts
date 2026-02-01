import DefaultTheme from 'vitepress/theme'
import LatestArticle from './LatestArticle.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LatestArticle', LatestArticle)
  }
} satisfies Theme
