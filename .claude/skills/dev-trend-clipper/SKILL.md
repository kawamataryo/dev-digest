---
name: dev-trend-clipper
description: "Dev Digestを作成する"
---

# Dev Digestを作成する

はてなブックマークIT人気エントリーとHacker NewsとRedditの人気記事を収集し、`articles/YYYY-MM-DD.md` に保存する。

## 実行手順

### 0. ユーザープロファイルを理解

利用者の興味領域を理解する：
- AI（開発と応用）
- JavaScript/TypeScript/React技術スタック
- OSS開発/コミュニティ
- キャリア/人生哲学（経済的自由、Build in Public）
- 個人開発/SaaS運営（Technical SEO、グロースハック、収益化）

### 1. トレンド情報の収集

以下のサイトから最新のトレンド情報を取得：

**日本市場（はてブIT）**
- https://b.hatena.ne.jp/hotentry/it
- https://b.hatena.ne.jp/hotentry/it/%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0
- https://b.hatena.ne.jp/hotentry/it/AI%E3%83%BB%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92
- https://b.hatena.ne.jp/hotentry/it/%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%AD%E3%82%B0%EF%BC%88%E3%83%86%E3%82%AF%E3%83%8E%E3%83%AD%E3%82%B8%E3%83%BC%EF%BC%89
- https://b.hatena.ne.jp/hotentry/it/%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2
- 各エントリーの**タイトル、元記事URL、ブックマーク数**を必ず取得すること
- はてブのエントリーページURLではなく、リンク先の元記事URLを抽出

**グローバル（Hacker News）**
- https://news.ycombinator.com/
- 各記事の**タイトル、HNコメントページURL（`https://news.ycombinator.com/item?id=XXXXX`形式）、ポイント数**を取得
- **元記事URLではなくHNのコメントページURLを使用すること**（コメントも確認できるようにするため）
- **タイトルは日本語に翻訳して出力**

**Reddit（13サブレッド）**
- **重要**: WebFetchツールはreddit.comをブロックするため、**Bashツールでcurlコマンドを使用**すること
- 各サブレッドから `/hot.json?t=day&limit=10` で上位10件を取得
- **old.reddit.com**を使用（www.reddit.comではない）
- User-Agentヘッダーを設定: `"User-Agent: neta-trend-collector/1.0 (trend analysis tool)"`
- 各記事の**タイトル、Redditコメントページの完全URL、投票数（ups）、コメント数**を取得
- **タイトルは日本語に翻訳して出力**

取得例（Bashツールで実行）:
```bash
curl -s -H "User-Agent: neta-trend-collector/1.0 (trend analysis tool)" \
  "https://old.reddit.com/r/programming/hot.json?t=day&limit=10" | \
  jq -r '.data.children[] | "\(.data.title)|\(.data.ups)|\(.data.num_comments)|https://www.reddit.com\(.data.permalink)"'
```

データ構造:
- `data.children[].data.title`: タイトル
- `data.children[].data.ups`: 投票数
- `data.children[].data.num_comments`: コメント数
- `data.children[].data.permalink`: パス（`https://www.reddit.com` + permalink で完全URL）

AI系（3サブレッド）:
- r/OpenAI
- r/LocalLLaMA
- r/ClaudeCode

コア技術系（2サブレッド）:
- r/programming
- r/technology

OSS/個人開発系（6サブレッド）:
- r/opensource
- r/indiehackers
- r/webdev
- r/javascript
- r/typescript
- r/react

キャリア/実践系（2サブレッド）:
- r/cscareerquestions
- r/productivity

### 2. 分析

収集した情報を以下の観点で分析し、出力に残すもの（はてブ 10件、hacker news 5件、reddit 5件）を選別する。

**興味領域マッチング（最優先）**
- 各記事を興味領域と照合し、関連度を評価
- 高関連度の記事を「注目トピック」の最上位に配置
- 特に注目すべきトピック：
  - AI関連（開発ツール）
  - OSS/個人開発関連（成功事例、マーケティング、収益化）
  - キャリア関連（リモートワーク、副業）
  - JavaScript/TypeScript/React関連（新技術、ツール、フレームワーク）

**はてブIT**
- 日本のエンジニアに刺さりやすい話題
- 議論を呼びそうなトピック
- 技術トレンド（AI、開発手法、ツール等）
- キャリア・働き方関連

**Hacker News**
- グローバルで話題の技術トレンド
- スタートアップ・プロダクト関連
- 議論を呼んでいるトピック（ポイント数が高い）

**Reddit（13サブレッド）**
- AI系：OpenAI、ローカルLLM、Claude Code関連
- OSS/個人開発系：OSSプロジェクト、個人開発、Web開発
- キャリア/実践系：キャリア、生産性
- 投票数（ups）とコメント数でコミュニティの反応を評価
- 議論が活発なトピック（コメント数が多い）を優先


### 3. 出力

**結果を `articles/YYYY-MM-DD.md` に保存。**

以下のフォーマットで出力：

```markdown
# Dev Digest (YYYY-MM-DD)

## Summary
<!-- 今日のトレンドを簡潔にまとめる。特筆すべき記事はリンク付きで触れる -->

## はてブIT（日本市場）

| Title | Bookmarks  | Category 
|---------|---------|---------|
| [タイトル](元記事URL) | XXX users | AI/開発/キャリア等 |

## Hacker News

| Title | Points | Category |
|---------|---------|--------|
| [タイトル](HNコメントページURL) | XXXpt | AI/Dev等 |


## Reddit

| Title | Votes | Comments | Category |
|---------|--------|-----------|--------|
| [タイトル](Redditコメントページ完全URL) | XXX ups | XXX | AI/OSS等 |
```


## 注意事項

- WebFetchツールを使用して情報を取得
- **すべての記事にURLリンクを必ず含める（リンクなしは不可）**
- **はてブは元記事のURLを必ず取得**（はてブページURLではなく）
- **Hacker NewsはHNコメントページURL（`item?id=`形式）を使用**（元記事URLではなく）
- **Hacker Newsのタイトルは日本語に翻訳**
- **RedditはRedditコメントページの完全URL（`https://www.reddit.com/r/subreddit/comments/...`形式）を使用**
- **Redditのタイトルは日本語に翻訳**
- Reddit APIレート制限に注意（1分あたり60リクエスト程度）
- 投票数（ups）/コメント数が高い記事を優先
- ポイント数/ブックマーク数が高い記事は特に注目
- 出力ファイルのYYYYMMDDは実行日の日付を使用