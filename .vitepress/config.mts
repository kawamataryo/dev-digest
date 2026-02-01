import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// articles/ ディレクトリから日付形式のMarkdownファイルを取得し、サイドバーアイテムを生成
function getArticleSidebarItems() {
  const articlesDir = path.resolve(__dirname, '../articles')
  
  // ディレクトリが存在しない場合は空配列を返す
  if (!fs.existsSync(articlesDir)) {
    return []
  }

  const files = fs.readdirSync(articlesDir)
    // 日付形式のファイル名のみをフィルタ（YYYY-MM-DD.md）
    .filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    // 日付降順でソート（新しい順）
    .sort().reverse()

  return files.map(f => ({
    text: f.replace('.md', ''),
    link: `/articles/${f.replace('.md', '')}`
  }))
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Dev Digest",
  description: "日々の開発ニュースをお届け",
  base: "/dev-digest/",
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'ホーム', link: '/' },
      { text: '記事一覧', link: '/articles/' }
    ],

    sidebar: {
      '/': [
        {
          text: '過去の記事',
          items: getArticleSidebarItems()
        }
      ],
      '/articles/': [
        {
          text: '過去の記事',
          items: getArticleSidebarItems()
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    outline: {
      label: '目次'
    }
  }
})
