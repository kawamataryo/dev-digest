import { createContentLoader, type ContentData } from 'vitepress'

export interface Article {
  title: string
  url: string
  date: string
  html: string
}

export default createContentLoader('articles/*.md', {
  render: true,
  transform(rawData: ContentData[]): Article[] {
    return rawData
      // 日付形式のファイル名のみをフィルタ（YYYY-MM-DD）
      .filter(page => /\/\d{4}-\d{2}-\d{2}(\.html)?$/.test(page.url))
      // 日付降順でソート
      .sort((a, b) => b.url.localeCompare(a.url))
      .map(page => {
        // URLから日付を抽出
        const dateMatch = page.url.match(/(\d{4}-\d{2}-\d{2})/)
        const date = dateMatch ? dateMatch[1] : ''
        
        return {
          title: date,
          url: page.url,
          date,
          html: page.html || ''
        }
      })
  }
})

// 型宣言（VitePressが自動的にdataを注入）
declare const data: Article[]
export { data }
