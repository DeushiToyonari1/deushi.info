# CLAUDE.md

## コミュニケーション

- 日本語で応答する（コードと変数名は英語）
- 簡潔に回答し、自明な説明は省略する
- 複雑なタスクでは実装前に計画を提示し、承認後に着手する

## プロジェクトの場所

- プロジェクトの実体は `/Applications/MAMP/htdocs` です（git リポジトリルートも同じ）
- React フロントエンド: `/Applications/MAMP/htdocs/frontend/`
- WordPress テーマ（静的ビルド）: `/Applications/MAMP/htdocs/dist/`
- WordPress ローカルインストール: `/Applications/MAMP/htdocs/wp/`（.gitignore 除外済み）
- リモート: `https://github.com/DeushiToyonari1/deushi.info.git`

## 禁止事項

- README・ドキュメントを勝手に生成・変更しない
- .ssh ディレクトリへのアクセスは許可しない
- `.env`, `.env.*` ファイルへのアクセスは許可しない
- テストコードを確認なしに削除・コメントアウトしない
- 既存の動作するコードを理由なくリファクタリングしない
- 読んでいないファイルを変更してはいけません

## Commands

| Purpose                                                  | Command                          |
| -------------------------------------------------------- | -------------------------------- |
| Development (no minification)                            | `npm run start` or `npm run dev` |
| Production build (minified CSS/JS, no image compression) | `npm run build`                  |
| Compress images in `dist/`                               | `npm run image-min`              |

**Note:** `NODE_ENV` must be set via the npm scripts — running `gulp` directly will fail.

## Local Environment Setup

This project requires MAMP (or equivalent) running PHP on port `8007`. Browser-sync proxies to `http://localhost:8007/`. The proxy URL is configured in `gulpfile.js` (`PROXY_URL`). The `dist/` directory is the document root served by MAMP.

To change the proxy port, edit `gulpfile.js`:

```js
const PROXY_URL = "http://localhost:8007/";
```
